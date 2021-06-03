---
layout: page
title:
tags: [fiyatal]
lang: tr
encoding: utf-8
modified: 2016-09-08T20:53:07.573882-04:00
comments: false
image:
  feature: landscape.jpg
---

<script type="text/JavaScript">
	var kamera = prompt("Kaç Kamera?", "1 ile 8 arasi bir deger yaziniz.");
	var alan = prompt("Kaç metrekare?", "Binanin alanini yaziniz.");
	var kablo=(Math.sqrt(alan)+3)*kamera*1.2;
	if (kamera<4 || kamera==4){
		var kayit=4;
		var sonuc = kablo+kayit*100+kamera*100+100*Math.log2(kablo);
	}else  {
		var kayit=8;
		var sonuc = kablo+kayit*100+kamera*100+40*Math.log2(kablo);
	}	
	document.write(kamera + " kameralı sistem fiyatı " + sonuc.toFixed(0) + " TL" + "<BR>");
	document.write(kamera + " adet kamera" + "<BR>");
	document.write(kablo.toFixed(0) + " metre kablo " + "<BR>");
	document.write(kayit + " kanallı kayıt cihazı " + "<BR>");
	document.write(alan + " metrekare bina alanı " + "<BR>");
	
</script>
