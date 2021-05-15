---
layout: single
title:  "Omron EE-SX1137 Photomicrosensor"
date:   2019-05-04 20:00:00 +0100
categories: 
 - iot
tags: 
 - sensors
 - sx1137
 - ee-sx1137-p2
 - CMKI-P3X
 - arduino
 - nano
 - analog input
 - plotter
---
Omron EE-SX1137 Photomicrosensor is used to identify if there is an obstruction in the apperture, commonly used in printers.

Although it has been discontinued since March 2020 [ref](https://components.omron.com/product-detail?partNumber=EE-SX1137), there are plenty of other components that operate in a similar fashion.


I had a lot of trouble finding good instruction on how to use this photomicrosensor.
The best implementation I could find online comes from [Z-Hut](http://thezhut.com/?page_id=974).

![modified diagram from z-hut](/assets/2019-05-04-photo-micro-sensor/Nano photomicrosensor diagram_web_modified.jpg)
Figure: Modified version of Z-Hut diagram.

In this post you can see how I got it to work.

My SX1137 was extracted from an [Epson C67](https://www.epson.com.au/products/inkjet/stylusc67.asp). 
It is in the mechanism to identify if a page had been collected for printing.
It works by emitting an infrared light (950nm) in one part and identifying it in the other side.
 If there is nothing in the path the sensor will measure a positive value of 1, if not there will be a 0 output. 
 The component datasheet can be found [here](http://www.symmetron.ru/suppliers/omron/files/pdf/omron/EE_SX1137.pdf) (a copy of the datasheet is [here](/assets/2019-05-04-photo-micro-sensor/EE_SX1137.pdf)).

The component list for this experiment:
- Arduino Nano (or similar)
- 330Ω or 1kΩ resistor (LED resistor)
- 10kΩ, 100kΩ or 1MΩ sensor resistor (in my experience, the higher the better).
- SX1137 photomicrosensor or, in my case, the board extracted from a printer.

![photomicrosensor front](/assets/2019-05-04-photo-micro-sensor/nano-photomicrosensor-front.png) 

![photomicrosensor back](/assets/2019-05-04-photo-micro-sensor/nano-photomicrosensor-back.png)

Figure: Component collected from the printer. 
On the left figure, the first block on the left is the detector, the one on the right is the emitter. 
On the right figure, A is the anode (+), K is the cathode (-) for the emitter. E is the emitter and C is the collector for the detector.

I connected 5V directly to the anode, and from the cathode I connected to the LED resistor. The other side of the LED resistor was connected to ground.
The collector from was connected to the sensor resistor and the analog input 0 (A0 on the Arduino). The other side of the sensor resistor was connected to ground.

This way analog input is measuring what is coming from the output sensor.

![diagram](/assets/2019-05-04-photo-micro-sensor/Nano photomicrosensor_bb.png)
Figure: The detector resistor in the diagram is 10k - better performance is obtained with higher values. Fritzing file can be obtained [here](/assets/2019-05-04-photo-micro-sensor/Nano photomicrosensor.fzz).

![nano setup](/assets/2019-05-04-photo-micro-sensor/nano-photomicrosensor.png)
![photomicrosensor wires](/assets/2019-05-04-photo-micro-sensor/nano-photomicrosensor-connector.png)
Figure: The setup.

I used this code on Arduino IDE:
{% highlight c %}
#include <Arduino.h>
#include "Plotter.h"

Plotter p;
double x;

void setup() {
  p.Begin();
  p.AddTimeGraph( "0", 500, "x label", x );
}

void loop() {
  x = analogRead(0);
  p.Plot();
  delay(100);
}
{% endhighlight %}

Let's run some experiments. 
I blocked the slot inserting a piece of paper.
Even using other types of surfaces and semi-opaque materials should do the job!

![sensor non blocked](/assets/2019-05-04-photo-micro-sensor/nano-photomicrosensor_open.png) ![sensor blocked](/assets/2019-05-04-photo-micro-sensor/nano-photomicrosensor_closed.png)
Figure: the photomicrosensor with and without the slot blocked.

When using a plotter software this is the output I got:
![sensor output graph](/assets/2019-05-04-photo-micro-sensor/nano-microphotosensor.png)

Figure: the measured values before (noisy positive values until the drop), during (zero values) and after (noisy positive values until the end) inserting a piece of paper in the slot.

It is possible to see there are very noisy points and the signal is weak. 
This is due to the resistors used. 
We are measuring the difference of voltage in the resistor. 
In the case of 10kΩ there is a very small drop in voltage in the resistor! 
If the resistor used is incremented to 100kΩ or even 1MΩ the signal is clearer!
