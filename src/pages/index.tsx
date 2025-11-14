import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const basePath = "/vfx-studio-docs"; // Define base path for images

  return (
    <Layout breadcrumbs="Home" title="Home">
      {/* Hero Section */}
      <div className="text-center pb-12">
        <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">
          Create Breathtaking Visual Effects
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          VFX Studio is an all-in-one toolkit for Roblox developers and artists
          to design, manage, and deploy stunning visual effects in real-time.
        </p>
        <div className="flex justify-center gap-4 mt-8">
          <Link href="/tutorials" className="px-6 py-3 rounded-md font-semibold transition-all duration-200 ease-in-out bg-primary-accent text-bg-main hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-accent/30">
            Get Started
          </Link>
          <Link href="/docs/reference-advanced" className="px-6 py-3 rounded-md font-semibold transition-all duration-200 ease-in-out bg-bg-surface text-text-primary border border-border-color hover:border-text-primary">
            Explore Features
          </Link>
        </div>
      </div>

      {/* Feature Sections */}
      <div className="py-12 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 gap-16 items-center mb-24">
          <div className="feature-text">
            <h2 className="text-3xl font-semibold mb-4">Iterate in Real-Time</h2>
            <p className="text-text-secondary leading-relaxed">
              Stop guessing. Tweak colors, retiming, scale, and emitter
              properties with live-updating floating panels. See your changes
              instantly in Studio, cutting your development time drastically.
            </p>
          </div>
          <div className="feature-image">
            <Image
              src={`${basePath}/input_file_0.png`}
              alt="Emitter and Sliders Panel"
              width={400}
              height={550}
              priority
              className="rounded-lg border border-border-color shadow-2xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-16 items-center mb-24">
          <div className="feature-text col-start-2">
            <h2 className="text-3xl font-semibold mb-4">Unleash Complex Animations</h2>
            <p className="text-text-secondary leading-relaxed">
              Go beyond simple particles. Use the powerful Bezier Curve Editor
              to design fluid property changes, and chain multiple movements,
              camera shakes, and screen effects together with the Advanced
              Panel.
            </p>
          </div>
          <div className="feature-image row-start-1">
            <Image
              src={`${basePath}/input_file_1.png`}
              alt="Bezier Curve Editor"
              width={500}
              height={450}
              className="rounded-lg border border-border-color shadow-2xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-16 items-center">
          <div className="feature-text">
            <h2 className="text-3xl font-semibold mb-4">A Comprehensive Asset Library</h2>
            <p className="text-text-secondary leading-relaxed">
              Browse thousands of textures, meshes, sound effects, and scripts.
              Save your own creations, create custom property presets, and
              organize it all with a powerful filtering and search system.
            </p>
          </div>
          <div className="feature-image">
            <Image
              src={`${basePath}/input_file_2.png`}
              alt="Asset Library"
              width={400}
              height={600}
              className="rounded-lg border border-border-color shadow-2xl"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}