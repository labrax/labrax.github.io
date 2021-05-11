---
layout: single
title:  "Setup TensorFlow on Linux"
date:   2017-04-06 20:00:00 +0100
categories: 
 - data science
tags: 
 - install
 - ubuntu
---
A set of steps to a setup.

These might be be outdated. I'll keep these for archiving reasons.

### Install latest gpu driver if needed
```bash
sudo apt-get update
sudo apt-get upgrade
```

### Install latest CUDA driver
https://developer.nvidia.com/cuda-downloads

### Install TensorFlow
https://www.tensorflow.org/install/install_linux

### Install other packages
```bash
pip install matplotlib # (with the virtualenv activated)
```

### Configure jupyter for virtualenv
http://help.pythonanywhere.com/pages/IPythonNotebookVirtualenvs
```bash
workon my-virtualenv-name  # activate your virtualenv, if you haven't already
pip install ipykernel
python -m ipykernel install --user --name=my-virtualenv-name
```

To use virtualenv
To activate: `source <folder>/bin/activate`
To deactivate: `deactivate`

To run env:
- `jupyter notebook # (at the folder)`
- `tensorboard`

Some curious links:
[Visualise a tensorflow graph in jupyter](http://stackoverflow.com/questions/38189119/simple-way-to-visualize-a-tensorflow-graph-in-jupyter)


