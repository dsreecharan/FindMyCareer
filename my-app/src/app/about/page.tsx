import Link from "next/link";

export default function About() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">About FindMyCareer</h1>
          <p className="text-xl text-muted-foreground">
            Helping high school students discover their ideal career paths
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-4">
              FindMyCareer is dedicated to helping Grade 9-12 students identify suitable career paths through a comprehensive psychological and scenario-based assessment. We believe that every student deserves guidance in finding a career that aligns with their strengths, interests, and values.
            </p>
            <p className="text-lg text-muted-foreground">
              Our platform not only suggests career options but also provides valuable information about colleges, entrance exams, eligibility criteria, and application processes, making the journey from high school to a fulfilling career smoother and more informed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background border rounded-lg p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Take the Test</h3>
                <p className="text-muted-foreground">
                  Complete our 15-question psychological and scenario-based test designed to assess your strengths, interests, and working style.
                </p>
              </div>
              <div className="bg-background border rounded-lg p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Recommendations</h3>
                <p className="text-muted-foreground">
                  Our algorithm analyzes your responses using our comprehensive dataset to suggest career paths that align with your profile.
                </p>
              </div>
              <div className="bg-background border rounded-lg p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Explore Options</h3>
                <p className="text-muted-foreground">
                  Discover detailed information about each recommended career, including top colleges, entrance exams, and application processes.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Our Data</h2>
            <p className="text-lg text-muted-foreground mb-4">
              FindMyCareer uses two primary datasets to provide accurate and helpful recommendations:
            </p>
            <div className="space-y-4">
              <div className="bg-background border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">Career Recommendation Dataset</h3>
                <p className="text-muted-foreground">
                  This dataset evaluates test responses to determine suitable career paths based on psychological profiles and scenario responses.
                </p>
              </div>
              <div className="bg-background border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">Master Career Dataset</h3>
                <p className="text-muted-foreground">
                  This comprehensive dataset maps career paths to colleges, locations, rankings, eligibility criteria, entrance exams, and application processes.
                </p>
              </div>
            </div>
          </section>

          <section className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Find Your Career?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Take our career test today and start your journey toward a fulfilling career that matches your unique profile.
            </p>
            <Link
              href="/career-test"
              className="px-6 py-3 text-lg font-medium text-white bg-primary rounded-md hover:bg-primary/90 inline-block"
            >
              Start Career Test
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
} 