<!doctype html>
<html lang="tr">
<head>
<meta http-equiv=X-UA-Compatible content="IE=edge">
<title>{% if page.title %}{{ page.title }} | {% endif %}{{ site.title }}</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
{% include _head.html %}
</head>

<body class="post-index">

{% include _browser-upgrade.html %}

{% include _navigation.html %}

{% if page.image.feature %}
{% if page.image.feature contains 'http' %}
<div alt="{{ page.title }} feature image" class="image-wrap" style="background: url('{{ page.image.feature }}'); background-size: cover; background-position: center;">
 {% else %}
<div alt="{{ page.title }} feature image" class="image-wrap" style="background: url('{{ site.url }}/images/{{ page.image.feature }}'); background-size: cover; background-position: center;">
{% endif %}
  {% if page.image.credit %}
    <span class="image-credit">Photo Credit: <a href="{{ page.image.creditlink }}">{{ page.image.credit }}</a></span>
  {% endif %}
  </div><!-- /.image-wrap -->
{% endif %}

<div id="main" role="main">
  <div id="index">
    <h1>{{ page.title }}</h1>
    {% for post in site.posts %}  
      {% if post.categories contains page.category %}
      <ul>
        {% if post.link %}
          <h2 class="link-post"><a href="{{ site.url }}{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a> <a href="{{ post.link }}" target="_blank" title="{{ post.title }}"><i class="fa fa-link"></i></a></h2>
        {% else %}
          <li><a href="{{ site.url }}{{ post.url }}" title="{{ post.title }}"><span class='post-image'  style="background: url('/images/{{ post.image.feature }}'); background-size: cover">&nbsp;</span>
          
          
          <h2>{{ post.title}}<hr><span>{{post.date | date: '%F'}}</span></h2>
           {% if post.categories contains 'video' or post.categories contains 'belgesel' %}
          <h4>İZLE...</h4>
          {% elsif post.categories contains 'makale' %}
          <h4>OKU...</h4>
          
          {% elsif post.categories contains 'article' %}
          <h4>READ...</h4>
          {% endif %}
          </a></li>
          <!--<p>{{ post.excerpt | strip_html | truncate: 160 }}</p> -->
        {% endif %}
      </ul>
      {% endif %}
    {% endfor %}
  </div><!-- /#index -->
</div><!-- /#main -->

<div class="footer-wrap">
  <footer>
    {% include _footer.html %}
  </footer>
</div><!-- /.footer-wrap -->

{% include _scripts.html %}
  
</body>
</html>
