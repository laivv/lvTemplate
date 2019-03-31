# lingluo-render
一个简单的js模板引擎
## useage
模板：
```html
<script type="text/template" id="template">  
 <ul>
      <% 
        for (var i = 0 ; i < data.length ; i++) { 
        var item = data[i]; 
      %>
      <li style="background:<%= i % 2 === 0 ? 'red' : 'green' %>;padding:20px">
          <%= i %> <%= item.name %>
      </li>
      <% } %>
  </ul>
</script>
```
```js

  var template = document.getElementById('template').innerHTML
  var option = {
      data: [{ name: 'item1' }, { name: 'item2' }, { name: 'item3' }]
    }
  // 第一种用法，返回渲染好的html字符串
  var html = render(template, option)

  // 第二种用法， 如果不传option则返回一个render function
  // var renderFn = render(template)
  // var html = renderFn(option)

```