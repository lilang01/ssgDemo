<template>
  <div class="service">
    <div class="container">
      <ul>
        <li>
          <span class="icon-setting"></span>预维维修服务
        </li>
        <li>
          <span class="icon-7day"></span>7天无理由退货
        </li>
        <li>
          <span class="icon-15day"></span>15天免费换货
        </li>
        <li>
          <span class="icon-post"></span>满150元包邮
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "service-bar"
}
</script>
<style scoped>
.service {
    padding: 33px 0;
    color: #666;
    font-size: 16px;
}
.service li {
    display: inline-block;
    width: 24.9%;
    text-align: center;
    border-right: 1px solid #e5e5e5;
}
.service li .icon-setting {
    background: url(/imgs/icon-setting.png) no-repeat 50%;
    background-size: contain;
}
.service li .icon-setting, .service li span {
    display: inline-block;
    width: 20px;
    height: 20px;
}
.service li span {
    vertical-align: middle;
    margin-right: 8px;
}
.service li .icon-7day {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url(/imgs/icon-7day.png) no-repeat 50%;
    background-size: contain;
}
.service li .icon-15day {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url(/imgs/icon-15day.png) no-repeat 50%;
    background-size: contain;
}
.service li .icon-15day {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url(/imgs/icon-15day.png) no-repeat 50%;
    background-size: contain;
}
</style>