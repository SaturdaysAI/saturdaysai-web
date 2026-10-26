---
title: "TorchFakes: DeepFake Detection"
description: "TorchFakes: DeepFake Detection"
pubDate: 2022-06-17
author: Info Saturdays
category: AI for good
kind: project
tags: []
image: /media/2d639db4838565f4.webp
imageAlt: "TorchFakes: DeepFake Detection"
legacyPath: /2022/06/17/torchfakes-deepfake-detection/
sourceUrl: https://saturdays.ai/2022/06/17/torchfakes-deepfake-detection/
sourceId: 7407
language: en
draft: false
---

Authors: [Aarón Espasandín Geselmann](https://www.linkedin.com/in/aaronespasa/), [Concepción Olivares Herráiz](https://www.linkedin.com/in/maria-c-olivares-herr%C3%A1iz/), [Jorge González Sierra](https://www.linkedin.com/in/jorgegonz%C3%A1lezsierra94/) and [Jaime Merino Albert](https://www.linkedin.com/in/jaime-merino-9993b4159/)

Mentors: [Alejandro Iñigo](https://www.linkedin.com/in/alejandro-%C3%AD%C3%B1igo-c%C3%B3rdoba-763202159/), [Teresa Garcia](https://www.linkedin.com/in/tegarce/) and [Nerea Encina](https://www.linkedin.com/in/nerea-encina-baranda/)

This is the final project of the **AI Saturdays Bootcamp**.

You can test this model using the [following link](https://huggingface.co/spaces/aaronespasa/deepfake-detection), just enter a picture and see the results!

**Introduction**

A DeepFake can be either an image or a video with sounds artificially created by a combination of machine learning algorithms.

Similarities can be found between this technology and image editing software, however, it is a step further. It can create people that do not exist or create a video by making a real person say or do things they did not actually do or say, as in the case of the famous Obama video.

It is a tool for disinformation, which can be used for scams, election manipulation, identity theft and even creating fake celebrity pornography videos.

**The motivation behind the project**

Nowadays, it seems more and more difficult to detect if the content that is spread over the network is true and more and more difficult to detect what is real and what is not.

That is why the main motivation of our project is to develop a model for the detection of deepfakes that could help people, institutions, and companies to detect false images in situations where they can be manipulated.

But not all deep fake applications are focused on manipulation or deception, there are also positive uses of deep fakes; applications in entertainment, advertising, cinema, research in medical uses, etc.

## Structure of the Project

For the project we have used the InceptionResNetV1 model trained with FaceForensics++ with HD videos at 30 FPS creating with it a balanced dataset of more or less 50% fake images and 50% real images. To extract the faces we have used the pre-trained MTCNN model.

We decided to use the Deep Learning Framework PyTorch because of the freedom it offers in comparison to Keras.

**Create a Face from the Dataset**

We used the FaceForensics++ dataset with a total of 21000 fake images and 5500 real images. We filtered out the blurred images that could impair the quality of the training by using a [script](https://github.com/aaronespasa/deepfake-detection/blob/main/dataset/blur_detection.py) that eliminated the blurred ones applying a convolution using the kernel of Laplace (which can be found right below) and obtaining the variance. We adjusted the blurred ones to all those with a variance of less than 30.

![](/media/2d639db4838565f4.webp)

Code for the convolution with the LaPlace Kernel

If you want to know more about why to use the Laplace kernel, you can take a look at [this article](https://ccia.ugr.es/vip/files/conferences/Autofocusing2000.pdf). In short, when applying a convolution, the edges of the image are highlighted. If there is a high amount of edges, then it has a high variance, and therefore we can conclude that it is not blurred.

Although we initially performed data augmentation, which we will detail below, we decided not to use it as we didn’t notice a difference in the results and the dataset was already diverse.

To extract faces from the videos and images in the dataset, we used the pretrained MTCNN model and imported it with the following line of code:

```python
from facenet_pytorch import MTCNN
```

This model is explained in the following [medium article](https://medium.com/@iselagradilla94/multi-task-cascaded-convolutional-networks-mtcnn-for-face-detection-and-facial-landmark-alignment-7c21e8007923). In summary, it is a model of 3 consecutive convolutional stages, in which the first one is a CNN where the image is taken and resized at different scales to build an image pyramid. The second stage is a FCN, which is used to obtain the candidate windows and their bounding box regression vectors.

The third and last stage (O-NET) is similar to the previous one but aims to describe the face in detail, positioning the eyes, nose and mouth.

We could see that the process of extracting faces from the images was well done with this example:

![](/media/45ad697d765e3397.webp)

Example of faces extracted with the MTCNN pretrained model

Initially, although we later dispensed with it as discussed above, we performed data augmentation to properly balance our training and validation data sets. For this we have used the following transformations:

![](/media/f3be44fc78903031.webp)

Code of the data augmentation

**Binary Image Classifier using Transfer Learning**

[ResNetV1](https://arxiv.org/abs/1512.03385) is a model launched in 2015. Before it existed, there were several ways to avoid the leakage gradient problem, however, none of them solved it completely.

The ResNet problem allowed us to solve the vanishing gradient problem.

![](/media/47012d71ad66d142.webp)

Ilustration of Inception ResNetV1

This meant that the information between layers not only circulated sequentially but also between “hops”, which added complexity to the algorithm.

If you want to know more about ResNet and its variants, we recommend this [article](https://towardsdatascience.com/an-overview-of-resnet-and-its-variants-5281e2f56035), from which we have obtained the images of the architecture.

To load the model in PyTorch you need this line of code:

```python
from facenet_pytorch import InceptionResnetV1
```

We have configured RESNET so that the last layer has a single class to perform a binary classification between “Real” and “Fake”.

![](/media/bfc0132d61173695.webp)

Configuration of Inception ResNetV1

## Evaluation and Results

**Results from typical metrics like accuracy**

The validation accuracy is 96.6 % for 80 epochs with a validation loss of 0.16.

All these metrics can be seen in the following image. We have performed this evaluation in [Weights & Biases](https://wandb.ai/aaronespasa/deepfake-detection/runs/bmdc9fxj/overview?workspace=user-aaronespasa) for the InceptionResnetV1 network trained with the FaceForensics++ dataset.

![](/media/81ad886352c80fc1.webp)

Metrics of our model

In Weights & Biases, we can see how we do not have the problem of vanishing gradients when using a ResNet.

![](/media/921247a0889757d6.webp)

Vanishing gradient

To train the model we used a laptop with a GTX 1070. The number of batches chosen for training was 16. We saw that if we used a higher number, the GPU would not hold up.

In the following image, we show the GPU usage for 80 batches.

![](/media/acaee020fa26b2bd.webp)

GPU usage during training

**Class Activation Maps to see what our model is focusing on**

To help us understand the decisions of our model we have used Class Activation Maps to see what it is focusing on when it is analyzing an image. To do so, we have used the Grad-CAM method, which consists of finding which parts of the image have led a convolutional neural network to its final decision. This method consists of producing heat maps that represent the activation classes on the input images received. An activation class is associated with a specific output class. These classes will make it possible to indicate the importance of each pixel with respect to the class in question by increasing or decreasing the intensity of the pixel.

After analyzing several examples, both real and fake, we can come to some conclusions. Firstly, our model mainly focuses on the chin and mouth area to detect the real images. Here we can see some examples of real images where we can appreciate it.

![](/media/ad182c40ab014b5f.webp)

However, when it comes to analyzing fake images, our model focuses more on the nose and mouth area. These examples of fake images clearly demonstrate this.

![](/media/c6e33756aded8038.webp)

## Inference using Gradio

We have used [GRADIO](https://gradio.app/) to create a basic interface where we can implement [our model](https://huggingface.co/spaces/aaronespasa/deepfake-detection).

## Conclusions, Difficulties and Next Steps

**Next Steps: App with PyTorch Live, Video Classification, keep audio in mind**

Application with PyTorch Live, video classification, audio consideration

During the project we have had a series of difficulties, the main one has been when performing the evaluation of the model, after the training phases, although the binary accuracy of both validations has shown a good result (96.39% after 10 epochs), when we tested the model, it erroneously classified all of them as “Real”. At first we attributed this error to the dataset, that after transformations, there were certain images that had defects, and that we had to download the videos to extract the faces with higher quality.

We finally solved it by filtering out the blurry images that were very detrimental to the training of the model. We avoided using transformations in the training dataset (only resize and convert to tensor). We extended the fake image dataset by filtering the blurred ones as described in the dataset section.

The next step in this project would be to make a model that is able to distinguish between fake and real videos without the need to extract faces from different frames. In addition to distinguish between manipulated audio or audio generated by deep learning algorithms.

The code can be found in our [GitHub repository](https://github.com/aaronespasa/deepfake-detection).

## **¡Más inteligencia artificial!**

Saturdays.AI makes AI more accessible through shared learning and projects with a social purpose. Our motto is AI4ALL IS AI4GOOD.

[Explore the available courses](https://cursos.saturdays.ai/)

[Meet the Saturdays.AI community](https://cursos.saturdays.ai/courses/saturdaysai-community-onboarding)
