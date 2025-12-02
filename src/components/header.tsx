import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="layout-header">
      <div className="col-span-6 mx-4 my-2">
        <Link href="/" className="hover:no-underline">
          <div className="wiki-logo text-foreground">ゴットを感じるマイクラ鯖wiki</div>
        </Link>
      </div>

      
    </header>
  );
}