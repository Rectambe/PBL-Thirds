// Rocky.js
var rocky = require('rocky');

// Global object to store weather data
var weather;

rocky.on('hourchange', function(event) {
  // Send a message to fetch the weather information (on startup and every hour)
  rocky.postMessage({'fetch': true});
});

rocky.on('minutechange', function(event) {
  // Tick every minute
  rocky.requestDraw();
});

rocky.on('message', function(event) {
  // Receive a message from the mobile device (pkjs)
  var message = event.data;

  if (message.weather) {
    // Save the weather data
    weather = message.weather;

    // Request a redraw so we see the information
    rocky.requestDraw();
  }
});

rocky.on('draw', function(event) {
  var ctx = event.context;
  var d = new Date();

  // Clear the screen
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  // Draw the conditions (before clock hands, so it's drawn underneath them)
  if (weather) {
    drawWeather(ctx, weather);
  }
  // Clear the screen
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  // Determine the width and height of the display
  var uw = ctx.canvas.unobstructedWidth;
  var uh = ctx.canvas.unobstructedHeight;
  
  var w = ctx.canvas.clientWidth;
  var h = ctx.canvas.clientHeight;
  
  ctx.fillStyle = 'white';
  
  ctx.fillRect(0, 0, w, h / 3);

  // Set the text color
  ctx.fillStyle = 'black';

  // Center align the text
  ctx.textAlign = 'center';
  

  // Display the time, in the middle of the screen
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
        if (weather) 
        {
          drawWeather(ctx, weather);
        }
      }
      else if (w == 200)
      {
        ctx.font = '24px Gothic';
        ctx.fillStyle = 'black';
        if (weather) 
        {
          drawWeather(ctx, weather);
        }
      }
     else
      {
        ctx.font = '18px Gothic';
        ctx.fillStyle = 'black';
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
        ctx.fillText('Pebble Time Round', w / 2, 122, uw);
        ctx.fillText('Chalk', w / 2 - 30, 142, uw);
        //ctx.strokeRect(w / 3 * 2 - 12, 151, 5, 9);
        //ctx.fillRect(w / 3 * 2 - 12, 149, 4, 2);
        //ctx.textAlign = 'left';
        //ctx.fillText('N/A', w / 2 + 25, 142, uw);
        
      }
    else if (w == 200)
      {
        ctx.textAlign = 'left';
        ctx.fillText('Pebble Time 2', 5, 155, uw);
        ctx.fillText('Emery', 5, 200, uw);
        //ctx.strokeRect(w / 2 + 42, 212, 8, 13);
        //ctx.fillRect(w / 2 + 43, 210, 5, 2);
        //ctx.textAlign = 'left';
        //ctx.fillText('N/A', w / 2 + 55, 200, uw);
      }
    else
      {
        ctx.textAlign = 'left';
        ctx.fillText('Pebble Time', 5, 112, uw);
        ctx.fillText('Basalt', 5, 142, uw);
        //ctx.strokeRect(w / 3 * 2 - 12, 151, 5, 9);
        //ctx.fillRect(w / 3 * 2 - 12, 149, 4, 2);
        //ctx.textAlign = 'left';
        //ctx.fillText('N/A', w / 2 + 25, 142, uw);
      }
});

function drawWeather(ctx, weather) {
  // Create a string describing the weather
  var weatherString = weather.celcius + 'ºC, ' + weather.desc;
  
  ctx.textAlign = 'center';
  ctx.font = '18px Gothic';
  
  if (weather.desc == 'Clear') 
    {
      ctx.fillStyle = '#00AAFF';
      ctx.fillRect(0, ctx.canvas.unobstructedHeight / 3, ctx.canvas.unobstructedWidth, ctx.canvas.unobstructedHeight / 3);
      ctx.fillStyle = 'black';
      ctx.fillText(weatherString, ctx.canvas.unobstructedWidth / 2, ctx.canvas.unobstructedHeight / 2 - 12);
    }
  else if (weather.desc == 'Rain') 
    {
      ctx.fillStyle = '#0000AA';
      ctx.fillRect(0, ctx.canvas.unobstructedHeight / 3, ctx.canvas.unobstructedWidth, ctx.canvas.unobstructedHeight / 3);
      ctx.fillStyle = 'white';
      ctx.fillText(weatherString, ctx.canvas.unobstructedWidth / 2, ctx.canvas.unobstructedHeight / 2 - 12);
    }
  else if (weather.desc == 'Clouds') 
    {
      ctx.fillStyle = 'gray';
      ctx.fillRect(0, ctx.canvas.unobstructedHeight / 3, ctx.canvas.unobstructedWidth, ctx.canvas.unobstructedHeight / 3);
      ctx.fillStyle = 'black';
      ctx.fillText(weatherString, ctx.canvas.unobstructedWidth / 2, ctx.canvas.unobstructedHeight / 2 - 12);
    }
  else if (weather.desc == 'Snow') 
    {
      ctx.fillStyle = '#55FFFF';
      ctx.fillRect(0, ctx.canvas.unobstructedHeight / 3, ctx.canvas.unobstructedWidth, ctx.canvas.unobstructedHeight / 3);
      ctx.fillStyle = 'black';
      ctx.fillText(weatherString, ctx.canvas.unobstructedWidth / 2, ctx.canvas.unobstructedHeight / 2 - 12);
    }
  else
    {
      ctx.fillStyle = 'gray';
      ctx.fillRect(0, ctx.canvas.unobstructedHeight / 3, ctx.canvas.unobstructedWidth, ctx.canvas.unobstructedHeight / 3);
    }  
}