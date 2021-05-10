---
layout: single
title:  "Is my model any good?"
date:   2019-11-04 20:00:00 +0100
categories: 
 - data science
tags: 
 - metrics
---
My model's accuracy is damn good.

But that is not enough, especially the case when the dataset is unbalanced, or if the model is uncalibrated.

In this post we explore binary problems and metrics, understand how these models work and how to assess the performance.
This post is based on a presentation:
- [metrics.ods](/assets/2019-11-04-model-metrics/20191104_VRC_metrics.ods)
- [metrics.xlsx](/assets/2019-11-04-model-metrics/20191104_VRC_metrics.xlsx)

The presentation are a bit self-explanatory for someone with a bit of experience with models and metrics, for the others let's go through it together.

On the sheet `Model 1` we see a model with accuracy 84%! Well, that is until you see in `Model 1 - Accuracy and more` that the data has actually 84% of it positive, and all the predictions are positive.

That is a disaster. The model is only predicting positive. It is paramount other metrics are also explored. On `Other metrics` we have the description of some other metrics, copied here:
- TPR (Sensitivity / Recall): What is the proportion of yes that we identify out of the real yes? For all the true yes we have in the data, how many of them are we identifying?
- TNR (Specificity): What is the proportion of no that we identify out of the real noes? For all the true noes we have, how many of them the model is identifying/predicting correctly?
- PPV (Precision): How good are our predicted yes? Out of the predicted positive, how many are really positive?
- FPR (1 – Specificity): What is the proportion of false positives out of the predicted noes? Out of the predicted noes, what is the ratio of falsely predicted negatives?

If it is not clear, check the formula and the [Wikipedia](https://en.wikipedia.org/wiki/Confusion_matrix) article about it.

Now, in `Model 2` we explore different metrics to this model, and explore some other metrics of it.

At this stage you should understand some metrics and understand a bit of the performance of the models created. However, in the way presented the models were summarised as an absolute prediction, a positive or a negative class.

An usual model, `How a logistic model works`, predicts a value in an interval of risk between 0 and 1 ([Logit function](https://en.wikipedia.org/wiki/Logit)). 
When assessing the performance of these models, `Model 2 - accuracy - tp, tn, fp`, a threshold (cell F3) is required to obtain the metrics discussed before.

And now you can start thinking about some metrics over the interval of thresholds, `Model 2 - AUC`, which exposes the AUC curve, or Sensitivity x 1-Specificity. Or even Precision x Sensitivity on `Model 2 - More than AUC`.

On another files you'll see `AUC`, `Precision-Recall`, and the `Prediction bins` for a model.
- [metrics extra.ods](/assets/2019-11-04-model-metrics/20191105_VRC_metrics_extra.ods)
- [metrics extra.xlsx](/assets/2019-11-04-model-metrics/20191105_VRC_metrics_extra.xlsx)
