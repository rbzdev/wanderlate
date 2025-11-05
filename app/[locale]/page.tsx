import Navbar from "@/Blocks/navbar"
import HeroHeader from "@/Blocks/Header"
import TrendingPlaces from "@/Blocks/TrendingPlaces"
import NearbyPlaces from "@/Blocks/NearbyPlaces"
import BecomePartner from "@/Blocks/BecomePartner"
import Footer from "@/Blocks/Footer"

// Components
import { BookUI } from "@/components/BookUI";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <Navbar />
      <main className="relative">

        <BookUI />
        <HeroHeader />

        {/* Places approximités */}
        <NearbyPlaces />

        <TrendingPlaces />
        
        <BecomePartner />

        
      </main>

      <Footer />
      
        {/* Background */}
        {/* <div className="fixed inset-0 -z-10 bg-linear-to-br from-primary/5 via-pink-500/5 to-blue-500/5" />
        <div className="fixed -top-24 right-[-10%] -z-10 size-144 rounded-full bg-primary/10 blur-3xl" />
        <div className="fixed -bottom-24 left-[-10%] -z-10 size-128 rounded-full bg-pink-500/10 blur-3xl" /> */}
    </div>
  )
}
