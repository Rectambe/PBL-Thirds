// Rocky.js
var rocky = require('rocky');


var weather;

rocky.on('hourchange', function(event) {
  rocky.postMessage({'fetch': true});
});

rocky.on('minutechange', function(event) {
  rocky.requestDraw();
});

rocky.on('message', function(event) {
  var message = event.data;

  if (message.weather) {
    weather = message.weather;

    rocky.requestDraw();
  }
});

rocky.on('draw', function(event) {
  var ctx = event.context;
  var d = new Date();

  // Clear the screen
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  if (weather) {
    drawWeather(ctx, weather);
  }
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  var uw = ctx.canvas.unobstructedWidth;
  var uh = ctx.canvas.unobstructedHeight;
  
  var w = ctx.canvas.clientWidth;
  var h = ctx.canvas.clientHeight;
  
  ctx.fillStyle = 'white';
  
  ctx.fillRect(0, 0, w, h / 3);

  ctx.fillStyle = 'black';

  ctx.textAlign = 'center';
  
    if (w == 180)
      {
        ctx.font = '38px bold numbers Leco-numbers';
        ctx.fillText(d.toLocaleTimeString(undefined, {hour: 'numeric'}) + ':' + d.toLocaleTimeString(undefined, {minute: '2-digit'}), w / 2, 2, uw);
        ctx.font = '18px Gothic';
        ctx.fillText(d.toLocaleDateString(undefined, {day: 'numeric'}) + ' ' + d.toLocaleDateString(undefined, {month: 'long'}), w / 2, 38, uw);
      }
      else if (w == 200)
        {
        ctx.font = '42px bold numbers Leco-numbers';
        ctx.fillText(d.toLocaleTimeString(undefined, {hour: 'numeric'}) + ':' + d.toLocaleTimeString(undefined, {minute: '2-digit'}), w / 2, 0, uw);
        ctx.font = '24px Gothic';
        ctx.fillText(d.toLocaleDateString(undefined, {day: 'numeric'}) + ' ' + d.toLocaleDateString(undefined, {month: 'long'}), w / 2, 42, uw);
       }
     else
       {
        ctx.font = '38px bold numbers Leco-numbers';
        ctx.fillText(d.toLocaleTimeString(undefined, {hour: 'numeric'}) + ':' + d.toLocaleTimeString(undefined, {minute: '2-digit'}), w / 2, -1, uw);
        ctx.font = '18px Gothic';
        ctx.fillText(d.toLocaleDateString(undefined, {day: 'numeric'}) + ' ' + d.toLocaleDateString(undefined, {month: 'long'}), w / 2, 35, uw);
       }

  ctx.fillStyle = 'gray';
  ctx.fillRect(0, h / 3, w, h / 3);
  
      if (w == 180)
      {
        ctx.font = '18px Gothic';
        ctx.fillStyle = 'black';
        ctx.fillText('Loading...', uw / 2, uh / 2 - 12, w);
        if (weather) 
        {
          drawWeather(ctx, weather);
        }
        
      }
      else if (w == 200)
      {
        ctx.font = '24px Gothic';
        ctx.fillStyle = 'black';
        ctx.fillText('Loading...', uw / 2, uh / 2 - 12, w);
        if (weather) 
        {
          drawWeather(ctx, weather);
        } 
      }
     else
      {
        ctx.font = '18px Gothic';
        ctx.fillStyle = 'black';
        ctx.fillText('Loading...', uw / 2, uh / 2 - 12, w);
        if (weather) 
        {
          drawWeather(ctx, weather);
        }
      }
  
  ctx.fillStyle = '#555555';
  ctx.strokeStyle = '#555555';
  ctx.font = '18px Gothic';
  
    if (w == 180)
      {
        ctx.textAlign = 'center';
        ctx.fillText('Pebble Time Round', w / 2, 122, uw);
        ctx.font = '14px Gothic';
        ctx.fillText(weather.name, w / 2, 142, uw);
        ctx.fillText('(' + weather.lon + ',' + weather.lat + ')', w / 2, 155, uw);
        //ctx.strokeRect(w / 3 * 2 - 12, 151, 5, 9);
        //ctx.fillRect(w / 3 * 2 - 12, 149, 4, 2);
        //ctx.textAlign = 'left';
        //ctx.fillText('N/A', w / 2 + 25, 142, uw);
        
      }
    else if (w == 200)
      {
        ctx.textAlign = 'left';
        ctx.fillText('Pebble Time 2', 5, 155, uw);
        ctx.fillText(weather.name  + ' ' + '(' + weather.lon + ',' + weather.lat + ')', 5, 200, uw);
        //ctx.strokeRect(w / 2 + 42, 212, 8, 13);
        //ctx.fillRect(w / 2 + 43, 210, 5, 2);
        //ctx.textAlign = 'left';
        //ctx.fillText('N/A', w / 2 + 55, 200, uw);
      }
    else
      {
        ctx.textAlign = 'left';
        ctx.fillText('Pebble Time', 5, 112, uw);
        ctx.font = '14px Gothic';
        ctx.fillText(weather.name + ' ' + '(' + weather.lon + ',' + weather.lat + ')', 5, 132, uw);
        //ctx.strokeRect(w / 3 * 2 - 12, 151, 5, 9);
        //ctx.fillRect(w / 3 * 2 - 12, 149, 4, 2);
        //ctx.textAlign = 'left';
        //ctx.fillText('N/A', w / 2 + 25, 142, uw);
      }
});

function drawWeather(ctx, weather) {
  var weatherString = weather.celcius + 'ºC, ' + weather.desc;
  
  ctx.textAlign = 'center';
  ctx.font = '24px Gothic';
  
  if (weather.desc == 'Clear') 
    {
      ctx.fillStyle = '#00AAFF';
      ctx.fillRect(0, ctx.canvas.clientHeight / 3, ctx.canvas.clientWidth, ctx.canvas.clientHeight / 3);
      ctx.fillStyle = 'black';
      ctx.fillText(weatherString, ctx.canvas.clientWidth / 2, ctx.canvas.clientHeight / 2 - 15);
    }
  else if (weather.desc == 'Rain') 
    {
      ctx.fillStyle = '#0000AA';
      ctx.fillRect(0, ctx.canvas.clientHeight / 3, ctx.canvas.clientWidth, ctx.canvas.clientHeight / 3);
      ctx.fillStyle = 'white';
      ctx.fillText(weatherString, ctx.canvas.clientWidth / 2, ctx.canvas.clientHeight / 2 - 15);
    }
  else if (weather.desc == 'Clouds') 
    {
      ctx.fillStyle = 'gray';
      ctx.fillRect(0, ctx.canvas.clientHeight / 3, ctx.canvas.clientWidth, ctx.canvas.clientHeight / 3);
      ctx.fillStyle = 'black';
      ctx.fillText(weatherString, ctx.canvas.clientWidth / 2, ctx.canvas.clientHeight / 2 - 15);
    }
  else if (weather.desc == 'Snow') 
    {
      ctx.fillStyle = '#55FFFF';
      ctx.fillRect(0, ctx.canvas.clientHeight / 3, ctx.canvas.clientWidth, ctx.canvas.clientHeight / 3);
      ctx.fillStyle = 'black';
      ctx.fillText(weatherString, ctx.canvas.clientWidth / 2, ctx.canvas.unobstructedHeight / 2 - 15);
    }
  else
    {
      ctx.fillStyle = 'gray';
      ctx.fillRect(0, ctx.canvas.clientHeight / 3, ctx.canvas.clientWidth, ctx.canvas.clientHeight / 3);
      ctx.fillStyle = 'black';
      ctx.fillText(weatherString, ctx.canvas.clientWidth / 2, ctx.canvas.clientHeight / 2 - 15);
    }  
}