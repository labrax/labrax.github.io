---
layout: single
title:  "Install R with Bioconductor on Linux"
date:   2017-05-12 20:00:00 +0100
categories: 
 - data science
tags: 
 - install
 - ubuntu
---
A set of steps to a setup.

These might be outdated. I'll keep these for archiving reasons.

Set the keys and the source for R as in: https://cran.rstudio.com/bin/linux/ubuntu/

## Basic R packages
```bash
sudo apt-get install r-base
sudo apt-get install r-base-dev
```

To install packages
```bash
sudo apt-get install gdebi-core
```

Download from the rstudio webpage and run
```bash
sudo gdebi rstudio-1.0.143-amd64.deb
```

In case installation fails because of gstreamer
```bash
sudo gdebi libgstreamer0.10-0_0.10.36-1.5_amd64.deb
sudo gdebi libgstreamer-plugins-base0.10-0_0.10.36-2_amd64.deb
```

Using apt-get
Install packages
```bash
sudo apt-get install r-cran-caret
```

On R
```bash
install.packages(pkgs = "caret", 
                 dependencies = c("Depends", "Imports"))
install.packages(pkgs = "caret", dependencies=TRUE)
```


## BIOCONDUCTOR
Before installing bioconductor on R studio install linux dependencies
```bash
sudo apt-get install libcurl4-openssl-dev libxml2-dev libcairo2-dev libxt-dev libmagick++-dev octave liboctave-dev libpq-dev libssl-dev openjdk-9-jdk libmariadb-client-lgpl-dev
sudo apt-get build-dep r-cran-rmpi
```

### Fix JAVA_HOME variable

Based on https://askubuntu.com/questions/175514/how-to-set-java-home-for-java

Reconfigure Java on R
```bash
sudo R CMD javareconf
```

### Install Bioconductor

Based on https://www.bioconductor.org/install/

In R:
```bash
source("https://bioconductor.org/biocLite.R")
biocLite()
```

Still on R studio
```bash
BiocInstaller::biocLite("caret", dependencies=c("Depends", "Suggests"))
```

Book/Tutorial on caret (_C_lassification _A_nd _RE_gression _T_raining)
https://topepo.github.io/caret

Other links:
https://www.rdocumentation.org/packages/plyr/versions/1.8.4/topics/join

Can be related:
[R Caret information](https://topepo.github.io/caret/)
[Applied Predictive Modeling](http://appliedpredictivemodeling.com/)
