export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeMap = {
    sm: { container: "w-8 h-8", text: "text-lg", icon: "w-8 h-8" },
    md: { container: "w-10 h-10", text: "text-2xl", icon: "w-10 h-10" },
    lg: { container: "w-12 h-12", text: "text-3xl", icon: "w-12 h-12" },
  };

  const styles = sizeMap[size];

  return (
    <div className="flex items-center gap-2">
      <svg
        viewBox="0 0 40 40"
        className={`${styles.icon} text-[#1698AC]`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Circular background */}
        <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="1.5" />
        
        {/* F shape */}
        <path
          d="M20 8V32M20 8H12M20 18H14"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* P shape */}
        <path
          d="M28 8V24M28 8H32C33.1 8 34 8.9 34 10V16C34 17.1 33.1 18 32 18H28"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="flex items-center">
        <span className={`${styles.text} font-bold text-black`}>Flolix</span>
        <span className={`${styles.text} font-bold text-[#1698AC]`}>Pro</span>
      </div>
    </div>
  );
}
