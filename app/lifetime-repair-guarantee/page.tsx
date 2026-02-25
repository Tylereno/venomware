export default function LifetimeRepairGuaranteePage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl md:text-6xl font-montserrat font-black tracking-tight glow-champagne">
            LIFETIME REPAIR GUARANTEE
          </h1>
          <p className="text-xl text-white/60 font-inter max-w-2xl mx-auto">
            If your VenomWear piece breaks, tears, or needs mending from normal wear, we will repair or replace it for free.
          </p>
          <div className="shimmer-divider w-56 mx-auto" />
        </div>

        <div className="space-y-6">
          <section className="border border-roseGold/25 p-8 bg-roseGold/[0.03]">
            <h2 className="text-2xl font-montserrat font-black mb-3">What Is Covered</h2>
            <ul className="space-y-2 text-white/80 font-inter">
              <li>• Broken straps, snaps, or closures</li>
              <li>• Holes or seam failures from normal use</li>
              <li>• Construction-related defects</li>
              <li>• Reasonable mending and reinforcement work</li>
            </ul>
          </section>

          <section className="border border-roseGold/25 p-8">
            <h2 className="text-2xl font-montserrat font-black mb-3">Customer Shipping Responsibility</h2>
            <p className="text-white/80 font-inter leading-relaxed">
              Repair and replacement work is free for life. Customers are responsible for shipping costs when sending items in and for return shipping after service is complete.
            </p>
          </section>

          <section className="border border-roseGold/25 p-8">
            <h2 className="text-2xl font-montserrat font-black mb-3">How To Request Service</h2>
            <ol className="space-y-2 text-white/80 font-inter">
              <li>1. Visit the Support & Alterations page.</li>
              <li>2. Submit your request with details and photos if available.</li>
              <li>3. We will reply with next steps and shipping instructions.</li>
            </ol>
          </section>

          <section className="border border-roseGold/25 p-8">
            <h2 className="text-2xl font-montserrat font-black mb-3">Hygiene Notice</h2>
            <p className="text-white/80 font-inter leading-relaxed">
              Due to hygiene standards, returns and refunds are generally limited. We focus on support, alterations, and repair solutions whenever possible.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
