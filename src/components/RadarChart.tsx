import { useEffect, useRef } from 'react';

interface RadarChartProps {
  data: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    abilityToLearn: number;
    realWorldAlignment: number;
  };
  size?: number;
}

const RadarChart = ({ data, size = 300 }: RadarChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = size;
    canvas.height = size;

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 40;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    const labels = ['Will', 'Interest', 'Skill', 'Cognitive', 'Learning', 'Alignment'];
    const values = [
      data.will,
      data.interest, 
      data.skill,
      data.cognitive,
      data.abilityToLearn,
      data.realWorldAlignment
    ];

    const angleStep = (2 * Math.PI) / labels.length;

    // Draw background grid
    ctx.strokeStyle = 'hsl(var(--border))';
    ctx.lineWidth = 1;
    
    // Draw concentric circles
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, (radius * i) / 5, 0, 2 * Math.PI);
      ctx.stroke();
    }

    // Draw axis lines
    for (let i = 0; i < labels.length; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    // Draw data polygon
    ctx.fillStyle = 'hsl(var(--primary) / 0.2)';
    ctx.strokeStyle = 'hsl(var(--primary))';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    for (let i = 0; i < values.length; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const value = values[i] / 100; // Normalize to 0-1
      const x = centerX + radius * value * Math.cos(angle);
      const y = centerY + radius * value * Math.sin(angle);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw data points
    ctx.fillStyle = 'hsl(var(--primary))';
    for (let i = 0; i < values.length; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const value = values[i] / 100;
      const x = centerX + radius * value * Math.cos(angle);
      const y = centerY + radius * value * Math.sin(angle);
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Draw labels
    ctx.fillStyle = 'hsl(var(--foreground))';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    for (let i = 0; i < labels.length; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const labelRadius = radius + 25;
      const x = centerX + labelRadius * Math.cos(angle);
      const y = centerY + labelRadius * Math.sin(angle);
      
      ctx.fillText(labels[i], x, y);
      
      // Draw score next to label
      ctx.font = 'bold 10px sans-serif';
      ctx.fillStyle = 'hsl(var(--primary))';
      ctx.fillText(`${values[i]}%`, x, y + 15);
      
      ctx.font = '12px sans-serif';
      ctx.fillStyle = 'hsl(var(--foreground))';
    }

  }, [data, size]);

  return (
    <div className="flex justify-center">
      <canvas ref={canvasRef} className="max-w-full h-auto" />
    </div>
  );
};

export default RadarChart;