import Card from "@/components/Card";
import {
  faCameraRotate,
  faRoute,
  faBookmark,
  faPalette,
} from "@fortawesome/free-solid-svg-icons";

export async function getStaticProps() {
  return {
    props: {
      title: "How-To Guides",
      breadcrumbs: "Getting Started / How-To Guides",
    },
  };
}

export default function GuidesPage() {
  
  return (
    <>
      <div className="text-center pb-12">
        <h1 className="text-5xl font-bold mb-2">How-To Guides</h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Find practical solutions to common problems. These guides are focused
          on accomplishing a specific task, assuming you know the basics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card href="/guides/camera-shake" icon={faCameraRotate} title="How to Create a Camera Shake">
          Learn to add powerful, cinematic camera shakes to your effects using
          the Advanced Panel.
        </Card>

        <Card href="#" icon={faRoute} title="How to Animate an Object Along a Path" disabled>
          A detailed guide on using the different Path Modes in the Advanced
          Panel's Tween section.
        </Card>

        <Card href="#" icon={faBookmark} title="How to Save and Reuse Property Sets" disabled>
          Speed up your workflow by saving collections of properties as
          presets that can be applied to any emitter.
        </Card>

        <Card href="#" icon={faPalette} title="How to Use Custom Themes" disabled>
          Personalize your workspace by creating, importing, and applying
          different color themes in the Settings panel.
        </Card>
      </div>
    </>
  );
}