<template>
  <!DOCTYPE html>
  <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    </head>
    <body>
      <div class="wrap">
        <div class="logo">
          <img src="../assets/404.png" alt="" />
          <h3 class="content">
            You do not have permission to access this site
          </h3>
          <p><router-link :to="'/'">Go back to Home</router-link></p>
        </div>
      </div>
    </body>
  </html>
</template>
<style lang="scss">
body {
  font-family: Arial, Helvetica, sans-serif;
}
.content{
    width: 3000px;
    color: rgb(170, 168, 168);
}
.wrap {
  width: 1000px;
  margin: 0 auto;
}
.logo {
  width: 430px;
  position: absolute;
  top: 25%;
  left: 35%;
}
p a {
  color: #eee;
  font-size: 13px;
  margin-left: 30px;
  padding: 5px;
  background: #ff3366;
  text-decoration: none;
  -webkit-border-radius: 0.3em;
  -moz-border-radius: 0.3em;
  border-radius: 0.3em;
}
p a:hover {
  color: #fff;
}
.footer {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 12px;
  color: #aaa;
}
.footer a {
  color: #666;
  text-decoration: none;
}
</style>