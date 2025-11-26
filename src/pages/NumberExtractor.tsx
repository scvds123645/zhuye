import React from 'react';
import { 
  Search, Home, MonitorPlay, Store, Users, Gamepad2, 
  Menu, Bell, MessageCircle, ChevronDown, ThumbsUp, 
  MessageSquare, Share2, MoreHorizontal, Video, Image, 
  Smile, Search as SearchIcon, Globe
} from 'lucide-react';

/* --- MOCK DATA --- */
const CURRENT_USER = {
  name: "Alex Dev",
  avatar: "https://ui-avatars.com/api/?name=Alex+Dev&background=0866FF&color=fff",
};

const STORIES = [
  { id: 1, name: "Create Story", img: "https://picsum.photos/200/300?random=1", avatar: CURRENT_USER.avatar, isUser: true },
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
    content: "Just finished refactoring the entire codebase for mobile responsiveness. Feels good! 🚀 #coding #react",
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
    image: null,
    likes: 89,
    comments: 12,
    shares: 5
  },
];

const CONTACTS = [
  { name: "Jessica Stone", avatar: "https://ui-avatars.com/api/?name=Jessica+Stone&background=random" },
  { name: "Daniel Park", avatar: "https://ui-avatars.com/api/?name=Daniel+Park&background=random" },
];

/* --- COMPONENTS --- */

// 1. Navbar (Header)
const Navbar = () => {
  return (
    <div className="bg-white shadow-sm fixed top-0 w-full z-50 flex flex-col">
      {/* Top Row: Logo, Search, Actions */}
      <div className="h-14 flex items-center justify-between px-3 md:px-4">
        {/* Left: Logo & Search */}
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 36 36" className="fill-[#0866FF] w-10 h-10" fill="currentColor">
            <path d="M20.181 35.87C29.094 34.791 36 27.202 36 18c0-9.941-8.059-18-18-18S0 8.059 0 18c0 8.442 5.811 15.526 13.652 17.471l.226-9.021H9.686v-5.204h4.192V17.6c0-4.007 2.384-6.223 6.046-6.223 1.753 0 3.585.313 3.585.313V15.62h-2.02c-2.062 0-2.705 1.28-2.705 2.592v3.037h4.44l-.71 5.204h-3.73v9.417z" />
          </svg>
          {/* Desktop Search */}
          <div className="hidden xl:flex items-center bg-[#F0F2F5] px-3 py-2 rounded-full w-64">
            <SearchIcon className="text-[#65676B] w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search Facebook" 
              className="bg-transparent border-none outline-none ml-2 text-[15px] placeholder-[#65676B] w-full"
            />
          </div>
          {/* Mobile Search Icon */}
          <div className="xl:hidden bg-[#F0F2F5] p-2.5 rounded-full cursor-pointer hover:bg-[#E4E6EB]">
            <SearchIcon className="text-[#65676B] w-5 h-5" />
          </div>
        </div>

        {/* Center: Navigation (Desktop Only) */}
        <div className="hidden md:flex h-full items-center gap-1 xl:gap-2 absolute left-1/2 -translate-x-1/2 top-0">
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
          {/* Hide less important icons on very small screens if needed, but keeping for now */}
          <IconButton Icon={MessageCircle} />
          <IconButton Icon={Bell} />
          <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer relative border border-gray-200">
             <img src={CURRENT_USER.avatar} alt="Profile" className="w-full h-full object-cover" />
             <div className="absolute bottom-0 right-0 bg-[#F0F2F5] p-[1px] rounded-full md:block hidden">
                <ChevronDown className="w-3 h-3 bg-[#E4E6EB] rounded-full text-black p-[2px]" />
             </div>
          </div>
        </div>
      </div>

      {/* Mobile Only: Secondary Navigation Tabs */}
      <div className="flex md:hidden justify-between px-2 pt-1 pb-1 border-t border-gray-100">
        <MobileNavTab Icon={Home} active />
        <MobileNavTab Icon={MonitorPlay} />
        <MobileNavTab Icon={Users} />
        <MobileNavTab Icon={Store} />
        <MobileNavTab Icon={Bell} />
        <MobileNavTab Icon={Menu} />
      </div>
    </div>
  );
};

const NavTab = ({ Icon, active = false }: { Icon: any; active?: boolean }) => (
  <div className={`h-14 px-8 md:px-4 lg:px-8 xl:px-10 flex items-center justify-center cursor-pointer relative group`}>
    <Icon 
      className={`w-7 h-7 ${active ? 'text-[#0866FF]' : 'text-[#65676B] group-hover:text-black'} transition-colors`} 
      strokeWidth={active ? 2.5 : 2} 
    />
    {active && (
      <div className="absolute bottom-0 h-[3px] w-full bg-[#0866FF]" />
    )}
    {!active && (
      <div className="absolute inset-x-2 top-2 bottom-2 rounded-lg group-hover:bg-[#F0F2F5] -z-10 transition-colors" />
    )}
  </div>
);

const MobileNavTab = ({ Icon, active = false }: { Icon: any; active?: boolean }) => (
  <div className="flex-1 flex justify-center py-2 relative cursor-pointer hover:bg-gray-50 rounded-lg">
    <Icon 
      className={`w-6 h-6 ${active ? 'text-[#0866FF]' : 'text-[#65676B]'} transition-colors`} 
      strokeWidth={active ? 2.5 : 2} 
    />
    {active && <div className="absolute bottom-0 h-[3px] w-8 bg-[#0866FF]" />}
  </div>
);

const IconButton = ({ Icon }: { Icon: any }) => (
  <div className="w-10 h-10 bg-[#E4E6EB] hover:bg-[#D8DADF] rounded-full flex items-center justify-center cursor-pointer transition-colors shrink-0">
    <Icon className="text-black w-5 h-5" />
  </div>
);

// 2. Sidebar (Hidden on Mobile)
const LeftSidebar = () => {
  return (
    <div className="hidden xl:block w-[360px] fixed left-0 top-14 bottom-0 p-4 overflow-y-auto hover:overflow-y-scroll custom-scrollbar">
      <SidebarRow src={CURRENT_USER.avatar} title={CURRENT_USER.name} />
      <SidebarRow Icon={Users} title="Friends" />
      <SidebarRow Icon={Store} title="Marketplace" />
      <SidebarRow Icon={MonitorPlay} title="Video" />
      <SidebarRow Icon={Globe} title="Memories" />
      <div className="my-2 border-b border-[#CED0D4]" />
      <div className="text-[#65676B] text-[13px] px-4">
        <p>Privacy · Terms · Advertising · Meta © 2025</p>
      </div>
    </div>
  );
};

// 3. Right Sidebar (Hidden on Tablet/Mobile)
const RightSidebar = () => {
  return (
    <div className="hidden lg:block w-[360px] fixed right-0 top-14 bottom-0 p-4 overflow-y-auto hover:overflow-y-scroll custom-scrollbar">
      <div className="mb-4">
        <h3 className="text-[#65676B] font-semibold text-[17px] mb-2">Sponsored</h3>
        <SponsoredItem title="Master React Today" url="react-mastery.com" img="https://picsum.photos/200/200?random=20" />
      </div>
      <div className="border-b border-[#CED0D4] my-2" />
      <div>
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-[#65676B] font-semibold text-[17px]">Contacts</h3>
        </div>
        {CONTACTS.map((c, i) => (
            <ContactRow key={i} src={c.avatar} name={c.name} />
        ))}
      </div>
    </div>
  );
};

// 4. Center Feed (Responsive Width)
const Feed = () => {
  return (
    <div className="flex-1 flex justify-center pb-10 min-h-screen w-full">
      {/* Container: 100% width on mobile, restricted on desktop */}
      <div className="w-full md:max-w-[590px] xl:max-w-[680px] px-0 md:px-4 pt-4 md:pt-6">
        
        {/* Stories - Horizontal Scroll with mobile optimization */}
        <div className="relative mb-4 md:mb-6">
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 px-2 md:px-0 scroll-smooth">
                {STORIES.map(story => (
                    <StoryCard key={story.id} story={story} />
                ))}
            </div>
        </div>

        {/* Create Post */}
        <div className="bg-white md:rounded-xl shadow-sm px-4 py-3 mb-4">
            <div className="flex gap-3 mb-3 border-b border-[#F0F2F5] pb-3">
                <img src={CURRENT_USER.avatar} alt="Me" className="w-10 h-10 rounded-full" />
                <div className="bg-[#F0F2F5] hover:bg-[#E4E6EB] rounded-full flex-1 flex items-center px-4 cursor-pointer transition-colors">
                    <span className="text-[#65676B] text-[15px] md:text-[17px] truncate">What's on your mind?</span>
                </div>
            </div>
            <div className="flex justify-between pt-1">
                <ActionBtn Icon={Video} color="#F02849" label="Live" fullLabel="Live video" />
                <ActionBtn Icon={Image} color="#45BD62" label="Photo" fullLabel="Photo/video" />
                <ActionBtn Icon={Smile} color="#F7B928" label="Activity" fullLabel="Feeling/activity" />
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

const SidebarRow = ({ src, Icon, title }: { src?: string; Icon?: any; title: string }) => (
  <div className="flex items-center gap-3 p-2 hover:bg-[#E4E6EB] rounded-lg cursor-pointer transition-colors">
    {src && <img src={src} alt="" className="w-9 h-9 rounded-full" />}
    {Icon && <Icon className="w-8 h-8 text-[#1B74E4]" />} 
    <span className="font-medium text-[#050505] text-[15px]">{title}</span>
  </div>
);

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
  <div className="relative w-[110px] h-[200px] md:w-[140px] md:h-[250px] rounded-xl overflow-hidden cursor-pointer group shrink-0 shadow-sm border border-black/5 md:border-none">
    <img 
      src={story.img} 
      alt="" 
      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" 
    />
    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
    
    {story.isUser ? (
      <div className="absolute bottom-0 w-full bg-white h-10 md:h-12 flex flex-col items-center pt-0">
        <div className="bg-[#0866FF] p-1 rounded-full border-4 border-white -mt-4 md:-mt-5">
            <svg viewBox="0 0 24 24" fill="white" width="20" height="20"><path d="M11 19V13H5v-2h6V5h2v6h6v2h-6v6Z"></path></svg>
        </div>
        <span className="text-[12px] md:text-[13px] font-semibold text-black mt-0.5 md:mt-1">Create</span>
      </div>
    ) : (
      <>
        <div className="absolute top-2 left-2 md:top-3 md:left-3 w-8 h-8 md:w-10 md:h-10 rounded-full border-4 border-[#0866FF] overflow-hidden">
            <img src={story.avatar} alt="" className="w-full h-full object-cover" />
        </div>
        <span className="absolute bottom-2 left-2 md:bottom-3 md:left-3 text-white font-semibold text-[12px] md:text-[13px] drop-shadow-md">{story.name}</span>
      </>
    )}
  </div>
);

const ActionBtn = ({ Icon, color, label, fullLabel }) => (
    <div className="flex-1 flex items-center justify-center gap-2 hover:bg-[#F0F2F5] py-2 rounded-lg cursor-pointer transition-colors">
        <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: color }} />
        <span className="text-[#65676B] font-semibold text-[14px] md:text-[15px]">
          <span className="md:hidden">{label}</span>
          <span className="hidden md:inline">{fullLabel}</span>
        </span>
    </div>
);

const PostCard = ({ post }) => (
    <div className="bg-white md:rounded-xl shadow-sm mb-3 md:mb-4">
        {/* Header */}
        <div className="flex items-center justify-between px-3 md:px-4 py-3">
            <div className="flex items-center gap-2">
                <img src={post.avatar} alt="" className="w-10 h-10 rounded-full cursor-pointer" />
                <div>
                    <h4 className="font-semibold text-[#050505] text-[15px]">{post.user}</h4>
                    <div className="flex items-center gap-1 text-[#65676B] text-[13px]">
                        <span>{post.time}</span>
                        <span>·</span>
                        <Globe className="w-3 h-3" />
                    </div>
                </div>
            </div>
            <div className="p-2 text-[#65676B]">
                <MoreHorizontal className="w-5 h-5" />
            </div>
        </div>

        {/* Content */}
        <div className="px-3 md:px-4 pb-3">
            <p className="text-[#050505] text-[15px] leading-snug">{post.content}</p>
        </div>
        {post.image && (
            <div className="w-full bg-gray-100 cursor-pointer">
                <img src={post.image} alt="Post" className="w-full h-auto object-cover max-h-[600px]" />
            </div>
        )}

        {/* Stats */}
        <div className="px-3 md:px-4 py-2 flex justify-between items-center border-b border-[#F0F2F5]">
            <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 bg-[#0866FF] rounded-full flex items-center justify-center">
                    <ThumbsUp className="w-2.5 h-2.5 text-white fill-white" />
                </div>
                <span className="text-[#65676B] text-[14px]">{post.likes}</span>
            </div>
            <div className="flex gap-3 text-[#65676B] text-[14px]">
                <span>{post.comments} comments</span>
                <span>{post.shares} shares</span>
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
    <div className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg active:bg-[#F0F2F5] md:hover:bg-[#F0F2F5] cursor-pointer text-[#65676B] transition-colors">
        <Icon className="w-5 h-5" />
        <span className="font-semibold text-[14px] md:text-[15px]">{label}</span>
    </div>
);

/* --- MAIN APP LAYOUT --- */

const FacebookMobile = () => {
  return (
    <div className="bg-[#F0F2F5] min-h-screen font-sans text-[#050505]">
      <Navbar />
      
      {/* 
        Padding Top Calculation:
        Header Height:
        - Mobile: h-14 (Logo row) + h-[45px] (Tabs) ~ approx pt-28
        - Desktop: h-14 ~ pt-14
      */}
      <div className="flex justify-between pt-[104px] md:pt-14">
        <LeftSidebar />
        <Feed />
        <RightSidebar />
      </div>
    </div>
  );
};

export default FacebookMobile;