// Rocky.js
var rocky = require('rocky');

var weather;

function twelve(n) {
  if (n >12)
    {
      return ("0" + n - 12);
    }
  else
    {
      return n;
    }
}

function padmin(n) {
    return (n < 10) ? ("0" + n) : n;
}

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
  
  var w = ctx.canvas.clientWidth;
  var h = ctx.canvas.clientHeight;
  
  var uw = ctx.canvas.unobstructedWidth;
  
  ctx.fillStyle = 'white';
  
  ctx.fillRect(0, 0, w, h / 3);

  ctx.fillStyle = 'black';

  ctx.textAlign = 'center';
  
    if (w == 180)
      {
        ctx.font = '38px bold numbers Leco-numbers';
        ctx.fillText(twelve(d.getHours()) + ':' + padmin(d.getMinutes()), w / 2, 2, w);
        ctx.font = '18px Gothic';
        ctx.fillText(d.toLocaleDateString(undefined, {day: 'numeric'}) + ' ' + d.toLocaleDateString(undefined, {month: 'long'}), w / 2, 38, uw);
      }
     else
       {
        ctx.font = '38px bold numbers Leco-numbers';
        ctx.fillText(twelve(d.getHours()) + ':' + padmin(d.getMinutes()), w / 2, -1, w);
        ctx.font = '18px Gothic';
        ctx.fillText(d.toLocaleDateString(undefined, {day: 'numeric'}) + ' ' + d.toLocaleDateString(undefined, {month: 'long'}), w / 2, 35, uw);
       }

  ctx.fillStyle = 'gray';
  ctx.fillRect(0, h / 3, w, h / 3);
  
      if (w == 180)
      {
        ctx.font = '18px Gothic';
        ctx.fillStyle = 'black';
        ctx.fillText('Loading...\n Do you have an internet connection?', w / 2, h / 2 - 32, w );
        if (weather) 
        {
          drawWeather(ctx, weather);
        }
        
      }
     else
      {
        ctx.font = '18px Gothic';
        ctx.fillStyle = 'black';
        ctx.fillText('Loading...\n Do you have an internet connection?', w / 2, h / 2 - 32, w );
        if (weather) 
        {
          drawWeather(ctx, weather);
        }
      }
  
  ctx.fillStyle = 'gray';
  ctx.strokeStyle = 'gray';
  ctx.font = '18px Gothic';
  
    if (w == 180)
      {
        ctx.textAlign = 'center';
        ctx.fillText('Pebble Time Round', w / 2, 120, uw);
        ctx.font = '14px Gothic';
        
        //Says Greeting based on the time
        if (d.getHours() >= 5 && d.getHours() < 12)
          {
            ctx.fillText("Good Morning", w / 2, 155, uw);
          }
        else if (d.getHours() >= 12 && d.getHours() < 17)
          {
            ctx.fillText("Good Afternoon", w / 2, 155, uw);
          }
        else if (d.getHours() >= 17 && d.getHours() < 20)
          {
            ctx.fillText("Good Evening", w / 2, 155, uw);
          }
        else if (d.getHours() >= 20 && d.getHours() < 5)
          {
            ctx.fillText("Good Night", w / 2, 155, uw);
          }
        ctx.fillText(weather.name, w / 2, 140, uw);
        //ctx.fillText(, w / 2, 155, uw);
        //ctx.strokeRect(w / 3 * 2 - 12, 151, 5, 9);
        //ctx.fillRect(w / 3 * 2 - 12, 149, 4, 2);
        //ctx.textAlign = 'left';
        //ctx.fillText('N/A', w / 2 + 25, 142, uw);
      }
    else
      {
        ctx.textAlign = 'left';
        ctx.fillText('Pebble Time', 5, 112, uw);
        ctx.font = '14px Gothic';
        
        //Says Greeting based on the time
        if (d.getHours() >= 5 && d.getHours() < 12)
          {
            ctx.fillText("Good Morning", 5, 148, uw);
          }
        else if (d.getHours() >= 12 && d.getHours() < 17)
          {
            ctx.fillText("Good Afternoon", 5, 148, uw);
          }
        else if (d.getHours() >= 17 && d.getHours() < 20)
          {
            ctx.fillText("Good Evening", 5, 148, uw);
          }
        else if (d.getHours() >= 20 && d.getHours() < 5)
          {
            ctx.fillText("Goodnight", 5, 148, uw);
          }
        
        ctx.fillText(weather.name, 5, 132, uw);
        console.log(weather.desc);
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
      ctx.fillText(weatherString, ctx.canvas.clientWidth / 2, ctx.canvas.clientHeight / 2 - 16);
    }
  else if (weather.desc == 'Rain') 
    {
      ctx.fillStyle = '#0000AA';
      ctx.fillRect(0, ctx.canvas.clientHeight / 3, ctx.canvas.clientWidth, ctx.canvas.clientHeight / 3);
      ctx.fillStyle = 'white';
      ctx.fillText(weatherString, ctx.canvas.clientWidth / 2, ctx.canvas.clientHeight / 2 - 16);
    }
  else if (weather.desc == 'Clouds') 
    {
      ctx.fillStyle = 'gray';
      ctx.fillRect(0, ctx.canvas.clientHeight / 3, ctx.canvas.clientWidth, ctx.canvas.clientHeight / 3);
      ctx.fillStyle = 'black';
      ctx.fillText(weatherString, ctx.canvas.clientWidth / 2, ctx.canvas.clientHeight / 2 - 16);
    }
  else if (weather.desc == 'Snow') 
    {
      ctx.fillStyle = '#55FFFF';
      ctx.fillRect(0, ctx.canvas.clientHeight / 3, ctx.canvas.clientWidth, ctx.canvas.clientHeight / 3);
      ctx.fillStyle = 'black';
      ctx.fillText(weatherString, ctx.canvas.clientWidth / 2, ctx.canvas.clientHeight / 2 - 16);
    }
  else if (weather.desc == 'Drizzle') 
    {
      ctx.fillStyle = '#00AAAA';
      ctx.fillRect(0, ctx.canvas.clientHeight / 3, ctx.canvas.clientWidth, ctx.canvas.clientHeight / 3);
      ctx.fillStyle = 'black';
      ctx.fillText(weatherString, ctx.canvas.clientWidth / 2, ctx.canvas.clientHeight / 2 - 16);
    }
  else
    {
      ctx.fillStyle = 'gray';
      ctx.fillRect(0, ctx.canvas.clientHeight / 3, ctx.canvas.clientWidth, ctx.canvas.clientHeight / 3);
      ctx.fillStyle = 'black';
      ctx.fillText(weatherString, ctx.canvas.clientWidth / 2, ctx.canvas.clientHeight / 2 - 16);
    }  
}