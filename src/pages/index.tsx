import Link from "next/link";
import FeatureSection from "@/components/FeatureSection";

export async function getStaticProps() {
  return {
    props: {
      title: "Home",
      breadcrumbs: "Home",
      description: "VFX Studio is an all-in-one toolkit for Roblox developers to design, manage, and deploy stunning visual effects.",
    },
  };
}

export default function HomePage() {
  
  return (
    <>
      <div className="text-center pb-12">
        <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">
          Create Breathtaking Visual Effects
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          VFX Studio is an all-in-one toolkit for Roblox developers and artists
          to design, manage, and deploy stunning visual effects in real-time.
        </p>
        <div className="flex justify-center gap-4 mt-8">
          <Link href="/tutorials" className="px-6 py-3 rounded-md font-semibold transition-all duration-200 ease-in-out bg-primary-accent text-text-on-accent hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-accent/30">
            Get Started
          </Link>
          <Link href="/docs/reference-advanced" className="px-6 py-3 rounded-md font-semibold transition-all duration-200 ease-in-out bg-bg-surface text-text-primary border border-border-color hover:border-text-primary">
            Explore Features
          </Link>
        </div>
      </div>

      <div className="py-12 max-w-5xl mx-auto">
        <FeatureSection
          title="Iterate in Real-Time"
          imageUrl="/input_file_0.png"
          imageAlt="Emitter and Sliders Panel"
          imageWidth={400}
          imageHeight={550}
        >
          Stop guessing. Tweak colors, retiming, scale, and emitter
          properties with live-updating floating panels. See your changes
          instantly in Studio, cutting your development time drastically.
        </FeatureSection>

        <FeatureSection
          title="Unleash Complex Animations"
          imageUrl="/input_file_1.png"
          imageAlt="Bezier Curve Editor"
          imageWidth={500}
          imageHeight={450}
          reverse={true}
        >
          Go beyond simple particles. Use the powerful Bezier Curve Editor
          to design fluid property changes, and chain multiple movements,
          camera shakes, and screen effects together with the Advanced
          Panel.
        </FeatureSection>

        <FeatureSection
          title="A Comprehensive Asset Library"
          imageUrl="/input_file_2.png"
          imageAlt="Asset Library"
          imageWidth={400}
          imageHeight={600}
        >
          Browse thousands of textures, meshes, sound effects, and scripts.
          Save your own creations, create custom property presets, and
          organize it all with a powerful filtering and search system.
        </FeatureSection>
      </div>
    </>
  );
}