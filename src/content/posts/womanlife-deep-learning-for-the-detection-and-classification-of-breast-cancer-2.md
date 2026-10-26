---
title: "WomanLife: Deep Learning for the detection and classification of breast
  cancer"
description: WomanLife explora la clasificación de ecografías de mama con
  TensorFlow y Keras. Un proyecto educativo con tres clases de imagen y límites
  clínicos explícitos.
pubDate: 2021-12-31
author: Miguel Guerrero
category: AI for good
kind: project
tags:
  - Breast Cancer
  - Convolutional Network
  - Deep Learning
  - Imagenes
  - Keras
  - Salud y Bienestar
  - TensorFlow
image: /media/5f76b0770c28e227.webp
imageAlt: "WomanLife: Deep Learning for the detection and classification of
  breast cancer"
legacyPath: /2021/12/31/womanlife-deep-learning-for-the-detection-and-classification-of-breast-cancer-2/
sourceUrl: https://saturdays.ai/2021/12/31/womanlife-deep-learning-for-the-detection-and-classification-of-breast-cancer-2/
sourceId: 5088
language: en
draft: false
updatedDate: 2026-10-25
---
Nota editorial: este artículo documenta un proyecto educativo y sus resultados en los datos utilizados. No acredita validación clínica ni autorización para diagnosticar o tratar a pacientes. Las propuestas de aplicación sanitaria se conservan como objetivos del equipo, no como capacidades demostradas.

![](/media/5f76b0770c28e227.webp)

[La Paz](https://saturdays.ai/la-paz/). Deep Learning. 2021

Today, thanks to deep learning algorithms of artificial intelligence, we have the possibility to automate the classification of images, so this tool can help medical personnel in the classification and early detection of breast cancer. In this way, women suffering from this disease could be diagnosed automatically, in time to start treatment.

Breast cancer is the most common type of cancer in women and is also one of the main causes of death according to the WHO (WHO, 2020). Early detection is the single most important factor in lowering cancer treatment costs and mortality. To make it possible it is necessary to have medical ultrasound images and specialists who can explain them. However, the lack of these creates a gap in access to early treatment in countries with little or not enough access to specialized diagnostic services and whose population receives low and middle income.



## Description of the problem

Our project consists of the detection and classification of breast cancer in women between 25 and 75 years old. This is possible from the development of an deep learning model trained with images obtained using ultrasound scanners that result in the segmentation of the type of cancer that could be suffered.



## Objective

Allow women suffering from breast cancer to be automatically diagnosed using a deep learning model so that they can start treatment early and safely, reducing costs and the mortality rate. To meet this objective, we have proposed a tool that uses artificial intelligence to provide greater agility to the process through self-diagnosis with ultrasound images.



## Model selection

The breast cancer detection and classification project works with ultrasound images of three types, labeled as **benign**, **malignant** and **neutral**, so the deep learning model selected for its execution is convolutional networks with **TensorFlow Keras**.



## Datasets

The dataset was collected from Baheya Hospital for Early Detection and Treatment of Women’s Cancer, Cairo, Egypt. It contains **780 breast ultrasound images**, in women between 25 and 75 years old (133 normal, 437 benign and 210 malignant) with an average image size of 500 x 500 pixels, some of which are seen below,

![](/media/dac2ae6287452760.webp)

Fig. 1. Samples of images

The images from the original dataset contain mask images that do not provide meaningful information to the model we developed, for this reason Shell statements were used to remove them from the dataset we are using.



## Implemented techniques

We must emphasize that until now there is a shortage of public data sets of breast cancer ultrasound images and it prevents the good performance of the algorithms. Because of this, the authors who made public the dataset we used, recommend augmenting data using **GANs**.

Our project developed GAN networks for each class in order to obtain more accurate results and **150 epochs** were used.

However, it failed to create usable images, for this reason we declined the use of this technique. The challenge is to develop the GAN with a greater number of epochs and with a better neural network configuration to obtain more realistic images.

![](/media/563eda63accfd455.webp)

Fig. 2. MALIGNANT

![](/media/399006bad872f067.webp)

Source: Compiled by authors using Matplotlib

![](/media/be78c029170bb38f.webp)

Fig. 3. BENIGN

![](/media/2e005e1edb3738fd.webp)

Source: Compiled by authors using Matplotlib

![](/media/d53742b67731e592.webp)

Fig.4. NORMAL

![](/media/5ab2edc3bc9fc6c8.webp)

Source: Compiled by authors using Matplotlib



## Network definition

Within the possible design patterns in Keras, subclassing has been implemented to use the low-level APIs of Keras. You can consult more information about this in the following article:

> [https://towardsdatascience.com/3-keras-design-patterns-every-ml-engineer-should-know-cae87618c7e3](https://towardsdatascience.com/3-keras-design-patterns-every-ml-engineer-should-know-cae87618c7e3)

The structure of the network consists of:

-   **Preprocessing layer**: Resizing, Rescaling and Normalization
-   **Conv2D**: 32 filters, 4 strides, ‘same’ padding and ReLU activation
-   **MaxPooling2D:** pool\_size of (3,3), ‘same’ padding and 2 strides
-   **Flatten**
-   **Dense**: 512 neurons and ReLU activation
-   **Dropout** (0.4)
-   **Dense**: 3 neurons and SoftMax activation

We are based on **AlexNet** architecture, on which we made some adjustments like number of neurons, fully connected layers and dropout values.

We use **Adam optimizer** with learning rate of **0.0001**, the **Sparse Categorical Crossentropy** loss function and **Sparse Categorical Accuracy** function.

![](/media/2623aca4c49490a0.webp)

Fig. 5. Model summary — Source: Compiled by authors



## Training

**TensorBoard** was used to observe the real-time behavior of the accuracy and loss values, which provides useful graphs to analyze results and many controls for their manipulation.

![](/media/3947145045a99154.webp)

Fig. 6. Dashboard TensorBoard — Source: Compiled by authors

**Earlystopping**

We use EarlyStopping as a form of regularization to avoid overfitting when training the model. For example, if the loss value stops decreasing, the training will stop even though all iterations have not been completed.



## Conclusions and future works

WomanLife is intended to be an easy-to-access, low-cost medical diagnostic tool.

This AI is not only beneficial for women who use it but also has the potential to become a medical assistant. We want to clarify that WomanLife does not intend to replace medical specialists but to provide a tool that facilitates their work.

From now on we intend to optimize the model using a GAN network to obtain greater precision and use techniques that find the correct parameters for training the model **(Hyperparameter tuning)**.

Our project also developed an application that, given an image scanned with the camera or selected from the gallery, goes through the developed network and returns a series of probabilities related to the type of cancer suffered.

The model was developed in pure TensorFlow, converted, saved and exported to **TensorFlow Lite**.

![](/media/89e0b89c49b43543.webp)

Fig. 7. Sample of the operation of the application prototype — Source: Own elaboration

![](/media/5f8bb3aacf1e3b70.webp)

Fig. 8. Conversion from TensorFlow to TensorFlow Lite architecture — Source: Own elaboration



## Sources

You can access to notebook and mobile application through my GitHub repositories bellow:

> https://github.com/edcalderin/BreastCancerDetection\_CNN
> 
> https://github.com/edcalderin/BreastCancerDetection\_app

Here, you will can find more projects related to Data Science and Machine Learning. In summary, it contains all my work so far. Any reply or comment is always welcome.



## About the authors

## **_Erick Calderin Morales_**

Systems engineer with experience in software development, master’s student in systems engineering and master’s degree in data science with an affinity for artificial intelligence.

Linkedin: [https://www.linkedin.com/in/erick-calderin-5bb6963b/](https://www.linkedin.com/in/erick-calderin-5bb6963b/)

## **_Sharon Maygua Mendiola_**

Mechatronics engineering student with a degree in physics.

Linkedin: [https://www.linkedin.com/in/sharon-sarai-maygua-mendiola-22288019a/](https://www.linkedin.com/in/sharon-sarai-maygua-mendiola-22288019a/)  


## References

-   Al-Dhabyani, W., Gomaa, M., Khaled, H., & Aly, F. (2019). Deep learning approaches for data augmentation and classification of breast masses using ultrasound images. _Int. J. Adv. Comput. Sci. Appl_, _10_(5), 1–11.
-   Al-Dhabyani, W., Gomaa, M., Khaled, H., & Fahmy, A. (2020). Dataset of breast ultrasound images. _Data in brief_, _28_, 104863.
-   TensorFlow. 2021. _Deep Convolutional Generative Adversarial Network | TensorFlow Core_. \[online\] Available at: <[https://www.tensorflow.org/tutorials/generative/dcgan](https://www.tensorflow.org/tutorials/generative/dcgan)\>.
-   Gowda. R., 2019. _DCGAN Implementation in Keras explained_. \[online\] Medium. Available at: <[https://medium.com/@ramyahrgowda/dcgan-implementation-in-keras-explained-e1918fc930ea](https://medium.com/@ramyahrgowda/dcgan-implementation-in-keras-explained-e1918fc930ea)\>.
-   Poulopoulos. D, 2021. 3 Keras Design Patterns Every ML Engineer Should Know. \[online\] Medium. Available at: <[https://towardsdatascience.com/3-keras-design-patterns-every-ml-engineer-should-know-cae87618c7e3](https://towardsdatascience.com/3-keras-design-patterns-every-ml-engineer-should-know-cae87618c7e3)\>.

[Saturdays.AI](https://medium.com/saturdays-ai?source=post_sidebar--------------------------post_sidebar--------------)

-   [Convolutional Network](https://medium.com/saturdays-ai/tagged/convolutional-network)
-   [Deep Learning](https://medium.com/saturdays-ai/tagged/deep-learning)
-   [Breast Cancer](https://medium.com/saturdays-ai/tagged/breast-cancer)
-   [TensorFlow](https://medium.com/saturdays-ai/tagged/tensorflow)
-   [Keras](https://medium.com/saturdays-ai/tagged/keras)

## Presentación del proyecto: DemoDay

[Abrir vídeo o recurso](https://www.youtube.com/embed/SBu9nw5TR34?start=7979&feature=oembed)

## Repositorio

En el siguiente repositorio se encuentra el código usuado para desarrollar esta aplicación:

[https://github.com/SaturdaysAI/Projects/tree/master/Lapaz/2021.DL/BreastCancerDetection\_CNN-master/BreastCancerDetection\_CNN-master](https://github.com/SaturdaysAI/Projects/tree/master/Lapaz/2021.DL/BreastCancerDetection_CNN-master/BreastCancerDetection_CNN-master)

WRITTEN BY

## [Erick Calderin](https://medium.com/@erickcalderin?source=follow_footer-----122cf92e134a-----------------------------------)

Systems Engineer passionated to Deep Learning and Artificial Inteligence

[![Saturdays.AI](/media/c3f89dabcc04aef9.webp)](https://medium.com/saturdays-ai?source=follow_footer-----122cf92e134a-----------------------------------)

## [**¡Más inteligencia artificial!**](https://medium.com/saturdays-ai?source=follow_footer-----122cf92e134a-----------------------------------)

Saturdays.AI is an impact-focused organization on a mission to empower diverse individuals to learn Artificial Intelligence in a collaborative and project-based way, beyond the conventional path of rogramas intensivos donde se realizan proyectos para el bien (_#ai4good_).

[Explore the available courses](https://cursos.saturdays.ai/)

[Meet the Saturdays.AI community](https://cursos.saturdays.ai/courses/saturdaysai-community-onboarding)
