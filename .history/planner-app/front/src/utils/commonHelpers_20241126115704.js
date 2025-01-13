

export const getCoordinates = (event, canvas) => {
  if (!canvas) {
      console.warn('Canvas элемент не найден');
      return { x: 0, y: 0 };
  }
  const rect = canvas.getBoundingClientRect();
  const x = (event.clientX - rect.left) * (canvas.width / rect.width);
  const y = (event.clientY - rect.top) * (canvas.height / rect.height);

  return { x, y };
};


export function findClickedObject(clickX, clickY, objects) {
    console.log(objects);
  for (const object of objects) {
    switch (object.type){
          case "line":
            case "tech":
              case "curve":
              for (let i = 0; i < object.points.length - 1; i++) {
                  const point1 = object.points[i];
                  const point2 = object.points[i + 1];
                  if (isPointNearLineSegment(clickX, clickY, point1, point2)) {
                      return object;
                  }
              }
          break;
          case "vision": 
            if(isPointOnCircle(object, clickX, clickY)){
                return object;
            }
            break;

            default: console.log('default object')
          break;
      }
  }
  
    function isPointOnCircle(object, x, y, tolerance = 5) {
        if (object.type !== 'vision' || !object.radius || !object.points || object.points.length === 0) {
      return false;
    }
      const centerX = object.points[0].x;
      const centerY = object.points[0].y;
      const radius = object.radius;
      
      const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
      return Math.abs(distance - radius) <= tolerance;
    }


  function isPointNearLineSegment(x, y, point1, point2, tolerance = 5) {
      const A = x - point1.x;
      const B = y - point1.y;
      const C = point2.x - point1.x;
      const D = point2.y - point1.y;

      const dot = A * C + B * D;
      const lenSq = C * C + D * D;
      const param = lenSq !== 0 ? dot / lenSq : -1;

      let nearestX, nearestY;
      if (param < 0) {
          nearestX = point1.x;
          nearestY = point1.y;
      } else if (param > 1) {
          nearestX = point2.x;
          nearestY = point2.y;
      } else {
          nearestX = point1.x + param * C;
          nearestY = point1.y + param * D;
      }

      const dist = Math.sqrt((x - nearestX) ** 2 + (y - nearestY) ** 2);
      return dist <= tolerance;
  }
export const  drawArea(x, y, radius, startAngle, endAngle, rotationAngle, strokeStyle, fillStyle) {
      this.context.save();
      this.context.translate(x, y);  
      this.context.rotate(rotationAngle); 
      this.context.beginPath();
      this.context.moveTo(0, 0);
      this.context.arc(0, 0, radius, startAngle, endAngle); 
      this.context.lineTo(0, 0); 
      this.context.fillStyle = fillStyle;
      this.context.fill();
      this.context.strokeStyle = strokeStyle;
      this.context.stroke();
      this.context.restore();
  }


}