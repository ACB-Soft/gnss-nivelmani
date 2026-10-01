import React, { useState } from 'react';
import {
  Github,
  X,
  Check,
  Copy,
  Terminal,
  FileCode2,
  FolderGit2,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface GitHubDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubDeployModal: React.FC<GitHubDeployModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const workflowYaml = `name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
      - master
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build Application
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`;

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto no-print animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 space-y-6 border border-slate-200 my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-inner">
              <Github className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>GitHub Actions & Pages ile PWA Yayınlama Rehberi</span>
              </h3>
              <p className="text-xs text-slate-500">
                Projenizi GitHub Pages üzerinde çevrimdışı PWA olarak canlıya alma adımları
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Steps */}
        <div className="space-y-5 text-xs text-slate-700 max-h-[60vh] overflow-y-auto custom-scrollbar pr-1">
          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px]">
                  1
                </span>
                <span>Otomatik Hazırlanan PWA & GitHub Actions Dosyaları</span>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Hazır
              </span>
            </div>
            <p className="text-slate-600">
              Projenizde aşağıdaki gerekli tüm konfigürasyon dosyaları oluşturulmuştur:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1 font-mono text-[11px]">
              <li>
                <strong className="text-slate-800">.github/workflows/deploy.yml</strong> : GitHub Actions otomatik build & deploy iş akışı
              </li>
              <li>
                <strong className="text-slate-800">public/manifest.json</strong> : PWA Manifest (Uygulama adı, ikonlar, renkler)
              </li>
              <li>
                <strong className="text-slate-800">public/sw.js</strong> : Service Worker (Çevrimdışı önbellekleme & tile cache)
              </li>
              <li>
                <strong className="text-slate-800">vite.config.ts</strong> : <code>base: './'</code> ve <code>VitePWA</code> eklentisi (GitHub Pages alt dizinlerinde 404 almaz)
              </li>
            </ul>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px]">
                2
              </span>
              <span>GitHub Ayarlarında "GitHub Actions" Kaynağını Seçin</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              GitHub repository sayfanızda:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-slate-600 pl-1 font-medium">
              <li>
                Deponuzun üst menüsünden <strong className="text-slate-800">Settings (Ayarlar)</strong> sekmesine tıklayın.
              </li>
              <li>
                Sol menüden <strong className="text-slate-800">Pages</strong> seçeneğine tıklayın.
              </li>
              <li>
                <strong>Build and deployment</strong> başlığı altındaki <strong>Source (Kaynak)</strong> açılır menüsünden <strong>"GitHub Actions"</strong> seçeneğini işaretleyin.
              </li>
            </ol>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px]">
                  3
                </span>
                <span>Kodları GitHub'a Push Edin</span>
              </div>
              <button
                onClick={() =>
                  copyToClipboard(
                    `git add .\ngit commit -m "feat: Add PWA support and GitHub Pages deploy workflow"\ngit push origin main`,
                    'git'
                  )
                }
                className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-200 transition flex items-center gap-1 text-[11px] cursor-pointer"
              >
                {copiedKey === 'git' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>Kopyalandı</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Komutları Kopyala</span>
                  </>
                )}
              </button>
            </div>
            <pre className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-[11px] overflow-x-auto">
{`git add .
git commit -m "feat: Add PWA support and GitHub Pages deploy workflow"
git push origin main`}
            </pre>
            <p className="text-[11px] text-slate-500">
              Push işleminden sonra GitHub <strong>Actions</strong> sekmesinde <em>"Deploy to GitHub Pages"</em> işi otomatik olarak başlayacak ve tamamlandığında sayfanız canlıya alınacaktır.
            </p>
          </div>

          {/* Step 4: Workflow Code preview */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <FileCode2 className="w-4 h-4 text-sky-600" />
                <span>.github/workflows/deploy.yml İçeriği</span>
              </div>
              <button
                onClick={() => copyToClipboard(workflowYaml, 'yaml')}
                className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-200 transition flex items-center gap-1 text-[11px] cursor-pointer"
              >
                {copiedKey === 'yaml' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>Kopyalandı</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>YAML'ı Kopyala</span>
                  </>
                )}
              </button>
            </div>
            <pre className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-[10px] overflow-x-auto max-h-48 custom-scrollbar">
              {workflowYaml}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow transition cursor-pointer"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
