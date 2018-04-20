---
layout: page
title: ApplicantList
permalink: /list/
---
<!-- <link rel="stylesheet" type="text/css" media="screen,projection" href="{{ "/assets/footer.css" | relative_url }}"> -->
<!--
<h1 class="page-title">{{ page.title | escape }}</h1> -->
<!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script> -->
<script src="{{ "js/sheet.js" | relative_url }}"></script>
<script async defer src="https://apis.google.com/js/api.js"
  onload="this.onload=function(){};handleClientLoad()"
  onreadystatechange="if (this.readyState === 'complete') this.onload()">
</script>
<body>
    <div class="section">

        <div class="progress" id="progress">
            <div class="indeterminate"></div>
        </div>

        <div class="row">
        <div class = "col s5" id="classtable" style = "text-align:center;"></div>
        <div class = "col s5 offset-s2" id="listtable" style = "text-align:center;" ></div>

    </div>
    </div>
</body>
