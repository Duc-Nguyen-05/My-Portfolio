import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft } from 'lucide-react';

export default async function SaltwaterIntrusionCaseStudy() {
    // Read markdown file from the file system
    const filePath = path.join(process.cwd(), 'outline', 'Saltwater_Intrusion_Forecast.md');
    let fileContent = '';
    try {
        fileContent = fs.readFileSync(filePath, 'utf-8');
    } catch (e) {
        fileContent = '# Lỗi tải nội dung\nKhông tìm thấy file outline/Saltwater_Intrusion_Forecast.md';
    }

    // Since react-markdown doesn't support mermaid out of the box nicely without extra config,
    // we'll instruct the user to view the graph as code or replace it with an image.
    // However, the standard markdown rendering will just render mermaid as a code block.

    return (
        <main className="min-h-screen bg-[#0A0F1A] text-slate-300 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 py-16 px-6">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-10 font-medium">
                    <ArrowLeft size={20} /> Back to Portfolio
                </Link>

                <article className="prose prose-invert prose-blue max-w-none prose-headings:text-slate-100 prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-strong:text-slate-200 bg-[#121723] p-8 md:p-12 rounded-2xl border border-slate-800 shadow-2xl">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {fileContent}
                    </ReactMarkdown>
                </article>
            </div>
        </main>
    );
}
