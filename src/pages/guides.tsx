import Layout from "@/components/Layout";
import Link from "next/link";

export default function GuidesPage() {
  return (
    <Layout breadcrumbs="Getting Started / How-To Guides">
      <div className="hero">
        <h1 className="hero-title">How-To Guides</h1>
        <p className="hero-subtitle">
          Find practical solutions to common problems. These guides are focused
          on accomplishing a specific task, assuming you know the basics.
        </p>
      </div>

      <div className="card-grid">
        <Link href="#" className="card card-howto">
          <div className="card-icon">
            <i className="fa-solid fa-camera-rotate"></i>
          </div>
          <h2 className="card-title">How to Create a Camera Shake</h2>
          <p className="card-description">
            Learn to add powerful, cinematic camera shakes to your effects using
            the Advanced Panel.
          </p>
          <div className="card-arrow">
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </Link>
        <Link href="#" className="card card-howto">
          <div className="card-icon">
            <i className="fa-solid fa-route"></i>
          </div>
          <h2 className="card-title">How to Animate an Object Along a Path</h2>
          <p className="card-description">
            A detailed guide on using the different Path Modes in the Advanced
            Panel's Tween section.
          </p>
          <div className="card-arrow">
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </Link>
        <Link href="#" className="card card-howto">
          <div className="card-icon">
            <i className="fa-solid fa-bookmark"></i>
          </div>
          <h2 className="card-title">How to Save and Reuse Property Sets</h2>
          <p className="card-description">
            Speed up your workflow by saving collections of properties as
            presets that can be applied to any emitter.
          </p>
          <div className="card-arrow">
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </Link>
        <Link href="#" className="card card-howto">
          <div className="card-icon">
            <i className="fa-solid fa-palette"></i>
          </div>
          <h2 className="card-title">How to Use Custom Themes</h2>
          <p className="card-description">
            Personalize your workspace by creating, importing, and applying
            different color themes in the Settings panel.
          </p>
          <div className="card-arrow">
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </Link>
      </div>
    </Layout>
  );
}
