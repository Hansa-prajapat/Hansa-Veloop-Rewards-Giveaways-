import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Bell, Home, PlayCircle, Gift, Trophy, User, Crown, Clock3,
  CheckCircle2, ChevronRight, Coins, Sparkles, ShoppingBag,
  Gamepad2, Music2, Instagram, Facebook, Youtube, Menu, X,
  ListChecks, ArrowUpRight, Star, TimerReset
} from "lucide-react";
import "./styles.css";

const ads = [
  { id: 1, title: "YouTube Promo", icon: Youtube, iconClass: "youtube" },
  { id: 2, title: "Instagram Video", icon: Instagram, iconClass: "instagram" },
  { id: 3, title: "Facebook Ad", icon: Facebook, iconClass: "facebook" },
  { id: 4, title: "Spotify Promo", icon: Music2, iconClass: "spotify" },
  { id: 5, title: "Game App Ad", icon: Gamepad2, iconClass: "game" },
  { id: 6, title: "Shopping Offer", icon: ShoppingBag, iconClass: "shop" }
];

const initialActivity = [
  ["Ad Watched", "+50 Coins", "2 mins ago", "play"],
  ["Reward Claimed", "+200 Coins", "15 mins ago", "gift"],
  ["Daily Bonus", "+100 Coins", "1 hour ago", "star"],
  ["Ad Watched", "+50 Coins", "2 hours ago", "play"]
];

function App() {
  const [balance, setBalance] = useState(1250);
  const [watched, setWatched] = useState(3);
  const [activity, setActivity] = useState(initialActivity);
  const [active, setActive] = useState("Home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [watching, setWatching] = useState(null);
  const [seconds, setSeconds] = useState(0);

  const startAd = (ad) => {
    if (watching) return;
    setWatching(ad);
    setSeconds(30);
    const timer = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          clearInterval(timer);
          setWatching(null);
          setBalance(b => b + 50);
          setWatched(w => Math.min(5, w + 1));
          setActivity(a => [["Ad Watched", "+50 Coins", "Just now", "play"], ...a].slice(0, 5));
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  const nav = [
    [Home, "Home"],
    [PlayCircle, "Watch & Earn"],
    [Gift, "Rewards"],
    [Trophy, "Giveaways"],
    [Crown, "Leaderboard"],
    [User, "Profile"]
  ];

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="mobile-menu" onClick={() => setMobileOpen(v => !v)}>
          {mobileOpen ? <X size={23}/> : <Menu size={23}/>}
        </button>
        <div className="brand">
          <div className="brand-mark"><span>V</span></div>
          <strong>Veloop</strong>
          <span className="brand-sub">Rewards & Giveaways</span>
        </div>
        <div className="top-actions">
          <div className="notification"><Bell size={20}/><b>3</b></div>
          <div className="profile">
            <div className="avatar">H</div>
            <span>Hansa Prajapat</span>
            <ChevronRight size={16}/>
          </div>
        </div>
      </header>

      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <nav>
          {nav.map(([Icon, label]) => (
            <button
              key={label}
              className={active === label ? "nav-item active" : "nav-item"}
              onClick={() => { setActive(label); setMobileOpen(false); }}
            >
              <Icon size={20}/><span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="side-promo">
          <div className="gift-orb"><Gift size={50}/></div>
          <h3>More Views<br/>More Rewards!</h3>
          <p>Watch ads, complete tasks and win amazing rewards!</p>
          <div className="wave"></div>
        </div>
        <div className="copyright">© 2025 Veloop. All rights reserved.</div>
      </aside>

      <main className="main">
        <section className="grid-top">
          <div className="hero card">
            <div className="hero-copy">
              <div className="welcome">Welcome Back, Hansa! 👋</div>
              <h1>Watch Ads &<br/><span>Earn Rewards</span></h1>
              <p>Watch short ads, complete tasks and collect coins. Redeem your rewards, join giveaways and win exciting prizes!</p>
              <button className="primary-btn" onClick={() => document.getElementById("ads")?.scrollIntoView({behavior:"smooth"})}>
                <PlayCircle size={19}/> Start Watching <ArrowUpRight size={18}/>
              </button>
            </div>
            <div className="hero-art">
              <div className="phone"><PlayCircle size={64}/><div className="phone-line"></div><div className="phone-line short"></div></div>
              <div className="coin c1"><Coins/></div>
              <div className="coin c2"><Coins/></div>
              <div className="coin c3"><Coins/></div>
              <div className="spark s1">✦</div><div className="spark s2">✦</div>
              <div className="gift-box"><Gift size={48}/></div>
              <div className="earn-tag"><Coins size={20}/> Earn<br/>Coins</div>
            </div>
          </div>

          <div className="right-stack">
            <div className="card balance-card">
              <h2>Your Balance</h2>
              <div className="balance-value"><Coins size={48}/><div><strong>{balance.toLocaleString()}</strong><small>≈ ₹{(balance / 10).toFixed(2)} (approx.)</small></div></div>
              <button className="gradient-btn" onClick={() => setActive("Rewards")}>Redeem Now <ArrowUpRight size={18}/></button>
            </div>

            <div className="card progress-card">
              <div className="card-title"><div className="title-icon"><ListChecks size={18}/></div><div><h3>Daily Progress</h3><p>Watch 5 ads to get 50 bonus coins</p></div></div>
              <div className="progress-row"><div className="progress"><i style={{width: `${Math.min(100, watched * 20)}%`}}></i></div><b>{watched} / 5</b></div>
              <div className="steps">{[1,2,3,4,5].map(n => <span className={n <= watched ? "done" : ""} key={n}>{n <= watched ? <CheckCircle2 size={15}/> : n}</span>)}</div>
            </div>
          </div>
        </section>

        <section id="ads" className="card ads-panel">
          <div className="section-heading">
            <div className="section-icon"><PlayCircle size={25}/></div>
            <div><h2>Watch Ads & Earn</h2><p>Choose from 6 unique ads and start earning coins</p></div>
            <div className="available"><span></span> 6 Ads Available</div>
          </div>

          <div className="ad-grid">
            {ads.map(ad => {
              const Icon = ad.icon;
              return (
                <article className="ad-card" key={ad.id}>
                  <span className="number">{ad.id}</span>
                  <div className={`ad-logo ${ad.iconClass}`}><Icon size={25}/></div>
                  <h3>{ad.title}</h3>
                  <div className="ad-meta"><Clock3 size={13}/> 30 seconds</div>
                  <div className="reward"><Coins size={15}/> +50 coins</div>
                  <button className="watch-btn" onClick={() => startAd(ad)} disabled={!!watching}>
                    <PlayCircle size={16}/> {watching?.id === ad.id ? `Watching ${seconds}s` : "Watch Now"}
                  </button>
                </article>
              );
            })}
          </div>

          <div className="quick-links">
            <div><PlayCircle/><span><b>Play & Earn</b><small>Watch ads & get coins</small></span><ChevronRight/></div>
            <div><ListChecks/><span><b>Complete Tasks</b><small>More ways to earn</small></span><ChevronRight/></div>
            <div><Trophy/><span><b>Win Giveaways</b><small>Big prizes every week</small></span><ChevronRight/></div>
            <div><Gift/><span><b>Redeem Rewards</b><small>Convert coins to gifts</small></span><ChevronRight/></div>
          </div>
        </section>

        <section className="activity-card card">
          <div className="activity-head"><h2><TimerReset size={22}/> Recent Activity</h2><button>View All</button></div>
          <div className="activity-list">
            {activity.map((item, i) => (
              <div className="activity" key={i}>
                <div className={`activity-icon ${item[3]}`}><itemIcon type={item[3]}/></div>
                <div><b>{item[0]}</b><strong>{item[1]}</strong></div>
                <time>{item[2]}</time>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer"><span>© 2025 Veloop. All rights reserved.</span><span>Terms & Conditions　 |　 Privacy Policy　 |　 Help</span></footer>

      {watching && (
        <div className="watch-overlay">
          <div className="watch-modal card">
            <div className="modal-icon"><PlayCircle size={44}/></div>
            <h2>{watching.title}</h2>
            <p>Your ad is playing. Keep this window open to receive your reward.</p>
            <div className="big-timer">{seconds}<small>s</small></div>
            <div className="timer-track"><i style={{width: `${((30-seconds)/30)*100}%`}}></i></div>
            <div className="modal-reward"><Coins size={17}/> You'll receive <b>+50 coins</b></div>
          </div>
        </div>
      )}
    </div>
  );
}

function itemIcon({type}) {
  if (type === "gift") return <Gift size={21}/>;
  if (type === "star") return <Star size={21}/>;
  return <PlayCircle size={21}/>;
}

createRoot(document.getElementById("root")).render(<App />);