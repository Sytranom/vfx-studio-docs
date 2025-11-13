import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <Layout breadcrumbs="Home" title="Home">
      {/* Hero Section */}
      <div className="hero">
        <h1 className="hero-title">Create Breathtaking Visual Effects</h1>
        <p className="hero-subtitle">
          VFX Studio is an all-in-one toolkit for Roblox developers and artists
          to design, manage, and deploy stunning visual effects in real-time.
        </p>
        <div className="hero-cta">
          <Link href="/tutorials" className="btn btn-primary">
            Get Started
          </Link>
          <Link href="/reference-advanced" className="btn btn-secondary">
            Explore Features
          </Link>
        </div>
      </div>

      {/* Feature Sections */}
      <div className="feature-container">
        <div className="feature-section">
          <div className="feature-text">
            <h2 className="feature-title">Iterate in Real-Time</h2>
            <p>
              Stop guessing. Tweak colors, retiming, scale, and emitter
              properties with live-updating floating panels. See your changes
              instantly in Studio, cutting your development time drastically.
            </p>
          </div>
          <div className="feature-image">
            <Image
              src="/input_file_0.png"
              alt="Emitter and Sliders Panel"
              width={400}
              height={550}
              priority
            />
          </div>
        </div>

        <div className="feature-section reverse">
          <div className="feature-text">
            <h2 className="feature-title">Unleash Complex Animations</h2>
            <p>
              Go beyond simple particles. Use the powerful Bezier Curve Editor
              to design fluid property changes, and chain multiple movements,
              camera shakes, and screen effects together with the Advanced
              Panel.
            </p>
          </div>
          <div className="feature-image">
            <Image
              src="/input_file_1.png"
              alt="Bezier Curve Editor"
              width={500}
              height={450}
            />
          </div>
        </div>

        <div className="feature-section">
          <div className="feature-text">
            <h2 className="feature-title">A Comprehensive Asset Library</h2>
            <p>
              Browse thousands of textures, meshes, sound effects, and scripts.
              Save your own creations, create custom property presets, and
              organize it all with a powerful filtering and search system.
            </p>
          </div>
          <div className="feature-image">
            <Image
              src="/input_file_2.png"
              alt="Asset Library"
              width={400}
              height={600}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
