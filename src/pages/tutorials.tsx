import Layout from "@/components/Layout";
import Link from "next/link";

export default function TutorialsPage() {
  return (
    <Layout breadcrumbs="Getting Started / Tutorials">
      <div className="hero">
        <h1 className="hero-title">Tutorials</h1>
        <p className="hero-subtitle">
          Learn how to create stunning visual effects from scratch with our
          project-based tutorials. These are designed for beginners to get
          started quickly.
        </p>
      </div>

      <div className="card-grid">
        <Link href="#" className="card card-tutorial">
          <div className="card-icon">
            <i className="fa-solid fa-hat-wizard"></i>
          </div>
          <h2 className="card-title">
            Your First Effect: Creating a Simple Orb
          </h2>
          <p className="card-description">
            A step-by-step introduction to the VFX Studio interface, where
            you'll create a basic magical orb effect and learn about core
            properties.
          </p>
          <div className="card-arrow">
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </Link>
        <Link href="#" className="card card-tutorial">
          <div className="card-icon">
            <i className="fa-solid fa-chart-line"></i>
          </div>
          <h2 className="card-title">Animating with Curves: A Pulse Effect</h2>
          <p className="card-description">
            Learn the fundamentals of the Bezier Curve Editor by creating a
            dynamic pulsing light effect. Master timing, easing, and the Range
            property.
          </p>
          <div className="card-arrow">
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </Link>
        <Link href="#" className="card card-tutorial">
          <div className="card-icon">
            <i className="fa-solid fa-route"></i>
          </div>
          <h2 className="card-title">Multi-Step Animation: A Basic Missile</h2>
          <p className="card-description">
            Combine a moving part with a particle emitter using the Advanced
            Panel. This tutorial introduces you to Tween Paths and chaining
            effects.
          </p>
          <div className="card-arrow">
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </Link>
      </div>
    </Layout>
  );
}
