import Layout from "@/components/Layout";
import Card from "@/components/Card"; // <-- Import the new component
import {
  faHatWizard,
  faChartLine,
  faRoute,
} from "@fortawesome/free-solid-svg-icons";


export default function TutorialsPage() {
  return (
    <Layout breadcrumbs="Getting Started / Tutorials" title="Tutorials">
      <div className="text-center pb-12">
        <h1 className="text-5xl font-bold mb-2">Tutorials</h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Learn how to create stunning visual effects from scratch with our
          project-based tutorials. These are designed for beginners to get
          started quickly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card href="/tutorials/your-first-effect" icon={faHatWizard} title="Your First Effect: Creating a Simple Orb">
          A step-by-step introduction to the VFX Studio interface, where
          you'll create a basic magical orb effect and learn about core
          properties.
        </Card>
        
        <Card href="#" icon={faChartLine} title="Animating with Curves: A Pulse Effect" disabled>
          Learn the fundamentals of the Bezier Curve Editor by creating a
          dynamic pulsing light effect. Master timing, easing, and the Range
          property.
        </Card>

        <Card href="#" icon={faRoute} title="Multi-Step Animation: A Basic Missile" disabled>
          Combine a moving part with a particle emitter using the Advanced
          Panel. This tutorial introduces you to Tween Paths and chaining
          effects.
        </Card>
      </div>
    </Layout>
  );
}