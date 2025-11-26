import React, { useState } from 'react';
import { 
  Search, Home, MonitorPlay, Store, Users, Gamepad2, 
  Menu, Bell, MessageCircle, ChevronDown, ThumbsUp, 
  MessageSquare, Share2, MoreHorizontal, Video, Image, 
  Smile, X, Search as SearchIcon, Globe
} from 'lucide-react';

/* --- MOCK DATA --- */
const CURRENT_USER = {
  name: "Alex Dev",
  avatar: "https://ui-avatars.com/api/?name=Alex+Dev&background=0866FF&color=fff",
};

const STORIES = [
  { id: 1, name: "Your Story", img: "https://picsum.photos/200/300?random=1", avatar: CURRENT_USER.avatar, isUser: true },
  { id: 2, name: "Sarah Connor", img: "https://picsum.photos/200/300?random=2", avatar: "https://ui-avatars.com/api/?name=Sarah+Connor&background=random" },
  { id: 3, name: "John Doe", img: "https://picsum.photos/200/300?random=3", avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random" },
  { id: 4, name: "Emily Smith", img: "https://picsum.photos/200/300?random=4", avatar: "https://ui-avatars.com/api/?name=Emily+Smith&background=random" },
  { id: 5, name: "Mike Ross", img: "https://picsum.photos/200/300?random=5", avatar: "https://ui-avatars.com/api/?name=Mike+Ross&background=random" },
];

const POSTS = [
  {
    id: 1,
    user: "Frontend Mastery",
    avatar: "https://ui-avatars.com/api/?name=Frontend+Mastery&background=E4E6EB&color=050505",
    time: "2h",
    content: "Just finished refactoring the entire codebase. Feels good! 🚀 #coding #react",
    image: "https://picsum.photos/600/400?random=10",
    likes: 124,
    comments: 45,
    shares: 12
  },
  {
    id: 2,
    user: "Design Daily",
    avatar: "https://ui-avatars.com/api/?name=Design+Daily&background=E4E6EB&color=050505",
    time: "4h",
    content: "Minimalism is not about removing things you love. It's about removing the things that distract you from the things you love.",
    image: null, // Text only post
    likes: 89,
    comments: 12,
    shares: 5
  },
  {
    id: 3,
    user: "Tech News Global",
    avatar: "https://ui-avatars.com/api/?name=Tech+News&background=E4E6EB&color=050505",
    time: "6h",
    content: "The new AI features announced today are going to change the industry landscape significantly. Here is a quick breakdown.",
    image: "https://picsum.photos/600/400?random=11",
    likes: 450,
    comments: 102,
    shares: 89
  }
];

const CONTACTS = [
  { name: "Jessica Stone", avatar: "https://ui-avatars.com/api/?name=Jessica+Stone&background=random" },
  { name: "Daniel Park", avatar: "https://ui-avatars.com/api/?name=Daniel+Park&background=random" },
  { name: "Lisa Wong", avatar: "https://ui-avatars.com/api/?name=Lisa+Wong&background=random" },
  { name: "Mark Zuckerberg", avatar: "https://ui-avatars.com/api/?name=Mark+Zuckerberg&background=random" },
  { name: "Chris Evans", avatar: "https://ui-avatars.com/api/?name=Chris+Evans&background=random" },
];

/* --- COMPONENTS --- */

// 1. Navbar
const Navbar = () => {
  return (
    <div className="bg-white h-14 w-full shadow-sm fixed top-0 z-50 flex items-center justify-between px-4">
      {/* Left: Logo & Search */}
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 36 36" className="fill-[#0866FF] w-10 h-10" fill="currentColor">
          <path d="M20.181 35.87C29.094 34.791 36 27.202 36 18c0-9.941-8.059-18-18-18S0 8.059 0 18c0 8.442 5.811 15.526 13.652 17.471l.226-9.021H9.686v-5.204h4.192V17.6c0-4.007 2.384-6.223 6.046-6.223 1.753 0 3.585.313 3.585.313V15.62h-2.02c-2.062 0-2.705 1.28-2.705 2.592v3.037h4.44l-.71 5.204h-3.73v9.417z" />
        </svg>
        <div className="hidden xl:flex items-center bg-[#F0F2F5] px-3 py-2 rounded-full w-64">
          <SearchIcon className="text-[#65676B] w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search Facebook" 
            className="bg-transparent border-none outline-none ml-2 text-[15px] placeholder-[#65676B] w-full"
          />
        </div>
        <div className="xl:hidden bg-[#F0F2F5] p-2.5 rounded-full">
            <SearchIcon className="text-[#65676B] w-5 h-5" />
        </div>
      </div>

      {/* Center: Navigation */}
      <div className="hidden md:flex h-full items-center gap-1 xl:gap-2">
        <NavTab Icon={Home} active />
        <NavTab Icon={MonitorPlay} />
        <NavTab Icon={Store} />
        <NavTab Icon={Users} />
        <NavTab Icon={Gamepad2} />
      </div>

      {/* Right: Menu & Profile */}
      <div className="flex items-center gap-2">
        <div className="hidden xl:block">
          <IconButton Icon={Menu} />
        </div>
        <IconButton Icon={MessageCircle} />
        <IconButton Icon={Bell} />
        <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer relative">
             <img src={CURRENT_USER.avatar} alt="Profile" className="w-full h-full object-cover" />
             <div className="absolute bottom-0 right-0 bg-[#F0F2F5] p-[1px] rounded-full">
                <ChevronDown className="w-3 h-3 bg-[#E4E6EB] rounded-full text-black p-[2px]" />
             </div>
        </div>
      </div>
    </div>
  );
};

const NavTab = ({ Icon, active }) => (
  <div className={`h-full px-8 md:px-6 xl:px-10 flex items-center justify-center cursor-pointer relative group`}>
    <Icon 
      className={`w-7 h-7 ${active ? 'text-[#0866FF]' : 'text-[#65676B] group-hover:text-black'} transition-colors`} 
      strokeWidth={active ? 2.5 : 2} // Simulating filled icon for active state
    />
    {active && (
      <div className="absolute bottom-0 h-[3px] w-full bg-[#0866FF]" />
    )}
    {!active && (
      <div className="absolute inset-x-2 top-2 bottom-2 rounded-lg group-hover:bg-[#F0F2F5] -z-10 transition-colors" />
    )}
  </div>
);

const IconButton = ({ Icon }) => (
  <div className="w-10 h-10 bg-[#E4E6EB] hover:bg-[#D8DADF] rounded-full flex items-center justify-center cursor-pointer transition-colors">
    <Icon className="text-black w-5 h-5" />
  </div>
);

// 2. Left Sidebar
const LeftSidebar = () => {
  return (
    <div className="hidden xl:block w-[360px] fixed left-0 top-14 bottom-0 p-4 overflow-y-auto hover:overflow-y-scroll custom-scrollbar">
      <SidebarRow src={CURRENT_USER.avatar} title={CURRENT_USER.name} />
      <SidebarRow Icon={Users} title="Friends" />
      <SidebarRow Icon={Store} title="Marketplace" />
      <SidebarRow Icon={MonitorPlay} title="Video" />
      <SidebarRow Icon={HistoryIcon} title="Memories" />
      <SidebarRow Icon={BookmarkIcon} title="Saved" />
      <SidebarRow Icon={GroupIcon} title="Groups" />
      <div className="my-2 border-b border-[#CED0D4]" />
      <div className="text-[#65676B] text-[13px] px-4">
        <p>Privacy  · Terms  · Advertising  · Ad Choices   · Cookies  ·  More · Meta © 2025</p>
      </div>
    </div>
  );
};

// 3. Right Sidebar
const RightSidebar = () => {
  return (
    <div className="hidden lg:block w-[360px] fixed right-0 top-14 bottom-0 p-4 overflow-y-auto hover:overflow-y-scroll custom-scrollbar">
      <div className="mb-4">
        <h3 className="text-[#65676B] font-semibold text-[17px] mb-2">Sponsored</h3>
        <SponsoredItem title="Master React Today" url="react-mastery.com" img="https://picsum.photos/200/200?random=20" />
        <SponsoredItem title="Luxury Watches" url="luxurytime.com" img="https://picsum.photos/200/200?random=21" />
      </div>
      <div className="border-b border-[#CED0D4] my-2" />
      <div>
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-[#65676B] font-semibold text-[17px]">Contacts</h3>
            <div className="flex gap-2">
                <Search className="w-4 h-4 text-[#65676B]" />
                <MoreHorizontal className="w-4 h-4 text-[#65676B]" />
            </div>
        </div>
        {CONTACTS.map((c, i) => (
            <ContactRow key={i} src={c.avatar} name={c.name} />
        ))}
      </div>
    </div>
  );
};

// 4. Center Feed
const Feed = () => {
  return (
    <div className="flex-1 flex justify-center pt-6 pb-10 px-4 min-h-screen">
      <div className="w-full max-w-[590px] xl:max-w-[680px]">
        {/* Stories */}
        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-2">
            {STORIES.map(story => (
                <StoryCard key={story.id} story={story} />
            ))}
        </div>

        {/* Create Post */}
        <div className="bg-white rounded-xl shadow-sm px-4 py-3 mb-4">
            <div className="flex gap-3 mb-3 border-b border-[#F0F2F5] pb-3">
                <img src={CURRENT_USER.avatar} alt="Me" className="w-10 h-10 rounded-full" />
                <div className="bg-[#F0F2F5] hover:bg-[#E4E6EB] rounded-full flex-1 flex items-center px-4 cursor-pointer transition-colors">
                    <span className="text-[#65676B] text-[17px]">What's on your mind, Alex?</span>
                </div>
            </div>
            <div className="flex justify-between pt-1">
                <ActionBtn Icon={Video} color="#F02849" label="Live video" />
                <ActionBtn Icon={Image} color="#45BD62" label="Photo/video" />
                <ActionBtn Icon={Smile} color="#F7B928" label="Feeling/activity" />
            </div>
        </div>

        {/* Posts */}
        {POSTS.map(post => (
            <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

/* --- SUB-COMPONENTS --- */

const SidebarRow = ({ src, Icon, title }) => (
  <div className="flex items-center gap-3 p-2 hover:bg-[#E4E6EB] rounded-lg cursor-pointer transition-colors">
    {src && <img src={src} alt="" className="w-9 h-9 rounded-full" />}
    {Icon && <Icon className="w-8 h-8 text-[#1B74E4]" />} 
    <span className="font-medium text-[#050505] text-[15px]">{title}</span>
  </div>
);

// Fake Icons for sidebar to match colorful look
const HistoryIcon = (props) => <div {...props} className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><span className="text-xl">H</span></div>; // Placeholder
const BookmarkIcon = (props) => <div {...props} className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600"><span className="text-xl">S</span></div>; // Placeholder
const GroupIcon = (props) => <div {...props} className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><span className="text-xl">G</span></div>; // Placeholder


const SponsoredItem = ({ title, url, img }) => (
  <div className="flex items-center gap-3 mb-4 hover:bg-[#E4E6EB] p-2 rounded-lg cursor-pointer transition-colors">
    <img src={img} alt="" className="w-28 h-28 object-cover rounded-lg" />
    <div className="flex flex-col justify-center">
      <span className="font-semibold text-[#050505] text-[15px]">{title}</span>
      <span className="text-[#65676B] text-[13px]">{url}</span>
    </div>
  </div>
);

const ContactRow = ({ src, name }) => (
  <div className="flex items-center gap-3 p-2 hover:bg-[#E4E6EB] rounded-lg cursor-pointer transition-colors relative">
    <div className="relative">
        <img src={src} alt="" className="w-9 h-9 rounded-full" />
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#31A24C] rounded-full border-2 border-white"></div>
    </div>
    <span className="font-medium text-[#050505] text-[15px]">{name}</span>
  </div>
);

const StoryCard = ({ story }) => (
  <div className="relative w-[140px] h-[250px] rounded-xl overflow-hidden cursor-pointer group shrink-0 shadow-sm">
    <img 
      src={story.img} 
      alt="" 
      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" 
    />
    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
    
    {story.isUser ? (
      <div className="absolute bottom-0 w-full bg-white h-12 flex flex-col items-center pt-0">
        <div className="bg-[#0866FF] p-1 rounded-full border-4 border-white -mt-5">
            <svg viewBox="0 0 24 24" fill="white" width="20" height="20"><path d="M11 19V13H5v-2h6V5h2v6h6v2h-6v6Z"></path></svg>
        </div>
        <span className="text-[13px] font-semibold text-black mt-1">Create story</span>
      </div>
    ) : (
      <>
        <div className="absolute top-3 left-3 w-10 h-10 rounded-full border-4 border-[#0866FF] overflow-hidden">
            <img src={story.avatar} alt="" className="w-full h-full object-cover" />
        </div>
        <span className="absolute bottom-3 left-3 text-white font-semibold text-[13px]">{story.name}</span>
      </>
    )}
  </div>
);

const ActionBtn = ({ Icon, color, label }) => (
    <div className="flex-1 flex items-center justify-center gap-2 hover:bg-[#F0F2F5] py-2 rounded-lg cursor-pointer transition-colors">
        <Icon className="w-6 h-6" style={{ color: color }} />
        <span className="text-[#65676B] font-semibold text-[15px] hidden sm:block">{label}</span>
    </div>
);

const PostCard = ({ post }) => (
    <div className="bg-white rounded-xl shadow-sm mb-4">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
                <img src={post.avatar} alt="" className="w-10 h-10 rounded-full hover:brightness-95 cursor-pointer" />
                <div>
                    <h4 className="font-semibold text-[#050505] text-[15px] hover:underline cursor-pointer">{post.user}</h4>
                    <div className="flex items-center gap-1 text-[#65676B] text-[13px]">
                        <span>{post.time}</span>
                        <span>·</span>
                        <Globe className="w-3 h-3" />
                    </div>
                </div>
            </div>
            <div className="p-2 hover:bg-[#F0F2F5] rounded-full cursor-pointer">
                <MoreHorizontal className="w-5 h-5 text-[#65676B]" />
            </div>
        </div>

        {/* Content */}
        <div className="px-4 pb-3">
            <p className="text-[#050505] text-[15px] leading-snug">{post.content}</p>
        </div>
        {post.image && (
            <div className="w-full bg-gray-100 cursor-pointer">
                <img src={post.image} alt="Post content" className="w-full h-auto object-cover max-h-[600px]" />
            </div>
        )}

        {/* Stats */}
        <div className="px-4 py-2 flex justify-between items-center border-b border-[#F0F2F5]">
            <div className="flex items-center gap-1.5 cursor-pointer">
                <div className="w-4 h-4 bg-[#0866FF] rounded-full flex items-center justify-center z-10">
                    <ThumbsUp className="w-2.5 h-2.5 text-white fill-white" />
                </div>
                <span className="text-[#65676B] text-[15px] hover:underline">{post.likes}</span>
            </div>
            <div className="flex gap-3 text-[#65676B] text-[15px]">
                <span className="hover:underline cursor-pointer">{post.comments} comments</span>
                <span className="hover:underline cursor-pointer">{post.shares} shares</span>
            </div>
        </div>

        {/* Action Bar */}
        <div className="px-2 py-1 flex justify-between">
            <PostActionBtn Icon={ThumbsUp} label="Like" />
            <PostActionBtn Icon={MessageSquare} label="Comment" />
            <PostActionBtn Icon={Share2} label="Send" />
        </div>
    </div>
);

const PostActionBtn = ({ Icon, label }) => (
    <div className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-[#F0F2F5] cursor-pointer text-[#65676B] transition-colors group">
        <Icon className="w-5 h-5 group-hover:text-[#65676B]" />
        <span className="font-semibold text-[15px]">{label}</span>
    </div>
);

/* --- MAIN APP LAYOUT --- */

const FacebookClone = () => {
  return (
    <div className="bg-[#F0F2F5] min-h-screen font-sans text-[#050505]">
      <Navbar />
      
      <div className="flex justify-between pt-14">
        <LeftSidebar />
        <Feed />
        <RightSidebar />
      </div>
    </div>
  );
};

export default FacebookClone;