

export const curveEndDrawArrow = (ctx, fromX, fromY, toX, toY, angle, lineWidth, strokeStyle) => {
    console.log('drawing')
    if (!ctx) return;
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.moveTo(toX, toY);
    ctx.lineTo(
        toX - headLength * Math.cos(angle - Math.PI / 6),
        toY - headLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.moveTo(toX, toY);
    ctx.lineTo(
        toX - headLength * Math.cos(angle + Math.PI / 6),
        toY - headLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.stroke();
    ctx.restore();
};


export default curveEndDrawArrow;