import layouts from "@/data/hero-illustration.json";
import "./HeroIllustration.css";

export default function HeroIllustration() {
  return (
    <div
      className="hero-illustration"
      role="img"
      aria-label="Clarity through an iterative process: understand the context, structure the complexity, explore solutions, refine with feedback, and bring it to life."
    >
      {Object.entries(layouts).map(([name, layout]) => (
        <div key={name} className={`hero-illustration__layout hero-illustration__layout--${name}`} aria-hidden="true">
          {layout.layers.map((layer) => (
            <span
              key={layer.id}
              className="hero-illustration__layer"
              data-illustration-layer={layer.id}
              style={{
                left: `${layer.x / layout.width * 100}%`,
                top: `${layer.y / layout.height * 100}%`,
                width: `${layer.width / layout.width * 100}%`,
                height: `${layer.height / layout.height * 100}%`,
                backgroundColor: layer.color,
                WebkitMaskImage: `url("${layer.src}")`,
                maskImage: `url("${layer.src}")`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
