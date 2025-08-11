import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { supabase } from '../../supabaseClient';

gsap.registerPlugin(ScrollTrigger);

function Wishes() {
  const [wishes, setWishes] = useState([]);
  const [newWish, setNewWish] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedWishId, setExpandedWishId] = useState(null);

  useEffect(() => {
    fetchWishes();
    console.log(wishes)
    
    // Simple fade-in on scroll to keep animations consistent
    gsap.fromTo(
      '.wishes-section .wish-card',
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.wishes-section',
          start: 'top 80%',
        },
      }
    );
  }, []);

  const fetchWishes = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching wishes:', error);
    } else {
      setWishes(data || []);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newWish.name.trim() || !newWish.message.trim()) return;

    setIsSubmitting(true);
    const { error } = await supabase
      .from('messages')
      .insert([newWish]);

    if (error) {
      console.error('Error adding wish:', error);
    } else {
      setNewWish({ name: '', message: '' });
      fetchWishes(); // Refresh wishes
    }
    setIsSubmitting(false);
  };

  const toggleWishExpansion = (wishId) => {
    setExpandedWishId(expandedWishId === wishId ? null : wishId);
  };

  return (
    <section data-color="white" className="wishes-section section w-full px-8 py-16">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-8">
          <h2 className="font-[SansitaReg] text-[5vh] leading-tight">🎂 Birthday Wishes</h2>
          <p className="font-[Sansita] text-zinc-600">Share your birthday message with love!</p>
        </header>
        
        {/* Add New Wish Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-12 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-200">
          <h3 className="font-[SansitaReg] text-2xl mb-4 text-center">✨ Send Your Birthday Wish</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your name"
              value={newWish.name}
              onChange={(e) => setNewWish({ ...newWish, name: e.target.value })}
              className="w-full p-3 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-300 focus:border-transparent"
              required
            />
            <textarea
              placeholder="Write your birthday wish..."
              value={newWish.message}
              onChange={(e) => setNewWish({ ...newWish, message: e.target.value })}
              className="w-full p-3 h-24 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-300 focus:border-transparent resize-none"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting || !newWish.name.trim() || !newWish.message.trim()}
              className="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white p-3 rounded-lg font-semibold disabled:opacity-50 hover:from-pink-500 hover:to-purple-500 transition-colors"
            >
              {isSubmitting ? '🎁 Sending...' : '🎈 Send Birthday Wish'}
            </button>
          </div>
        </form>

        {/* Display Wishes */}
        {wishes.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-[Sansita] text-zinc-500 mb-4">🎈 No wishes yet!</h3>
            <p className="text-zinc-400">Be the first to send a birthday wish!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishes.map((wish) => (
              <article key={wish.id} className="wish-card rounded-xl border border-zinc-200 bg-white/70 backdrop-blur p-5 shadow-sm hover:shadow-md transition-shadow">
                <p className="font-[Sansita] text-[2.2vh] leading-relaxed text-zinc-800 mb-3">
                  {wish.message.length > 400 && expandedWishId !== wish.id
                    ? `${wish.message.substring(0, 400)}...`
                    : wish.message}
                  {wish.message.length > 400 && (
                    <button
                      onClick={() => toggleWishExpansion(wish.id)}
                      className="text-blue-500 hover:underline ml-2"
                    >
                      {expandedWishId === wish.id ? 'Read Less' : 'Read More'}
                    </button>
                  )}
                </p>
                <div className="text-right">
                  <span className="text-sm font-semibold text-purple-600">- {wish.name}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Wishes;
