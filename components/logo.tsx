import { Smartphone } from "lucide-react"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      
      <span className="text-xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
        CORELY
      </span>
    </div>
  )
}

export function LogoIcon({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
        <Smartphone className="w-5 h-5 text-white" />
      </div>
    </div>
  )
}

export function LogoWhite({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
        <Smartphone className="w-5 h-5 text-white" />
      </div>
      <span className="text-xl font-black text-white">
        Corely
      </span>
    </div>
  )
}
