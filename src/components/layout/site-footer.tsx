import { Wordmark } from "@/components/brand/wordmark";
import { ArrowIcon } from "@/components/ui/icons";
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <p>
            İyi kahve.
            <br />
            Güzel insanlar. Ortak hikâyeler.
          </p>
          <a href="#baslangic" className="text-link">
            Başa dön <ArrowIcon diagonal />
          </a>
        </div>
        <Wordmark className="footer-wordmark" />
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Yâren</span>
          <span>Özenle demlendi, keyifle paylaşıldı.</span>
          <span>Hayali bir marka. Gerçek bir tasarım tutkusu.</span>
        </div>
      </div>
    </footer>
  );
}
