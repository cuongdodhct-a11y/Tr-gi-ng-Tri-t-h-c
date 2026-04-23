/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import VoiceChat from './components/VoiceChat';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "motion/react";
import { MonitorPlay, Users, Brain, BookOpen, Quote, Shield } from "lucide-react";

// Tự tạo một Vector Logo SVG thay vì hình ảnh tĩnh, tuân thủ đúng yêu cầu: phẳng (flat), tối giản (minimalist), 
// cấu trúc hình học (geometric), tone màu xanh quân đội và nhấn nhá vàng subtle (gold accents).
const EmblemLogo = () => (
  <motion.div 
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="flex justify-center mb-8"
  >
    <svg viewBox="0 0 120 120" className="w-32 h-32 md:w-40 md:h-40 drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer Military Green Shield/Circle */}
      <circle cx="60" cy="60" r="58" fill="#1C2E24" />
      
      {/* Subtle Gold Accent Rings */}
      <circle cx="60" cy="60" r="52" stroke="#C5A866" strokeWidth="1" strokeDasharray="3 3"/>
      <circle cx="60" cy="60" r="50" stroke="#C5A866" strokeWidth="0.5" />
      
      {/* Geometric Academic Element (Book / Dialectical structure) */}
      <path d="M 35 70 L 60 78 L 85 70 L 85 40 L 60 48 L 35 40 Z" fill="#284236" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M 60 48 L 60 78" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round"/>
      
      {/* Central Abstract Pillar/Silhouette (Leadership & Discipline) */}
      <path d="M 54 48 L 60 38 L 66 48 L 60 62 Z" fill="#C5A866" />
      <path d="M 60 62 L 60 38" stroke="#1C2E24" strokeWidth="0.5" />
      
      {/* Top Star (Military Symbolism) */}
      <path d="M 60 22 L 62.5 28.5 L 69.5 28.5 L 64 32.5 L 66.5 39 L 60 35 L 53.5 39 L 56 32.5 L 50.5 28.5 L 57.5 28.5 Z" fill="#C5A866"/>

      {/* Monogram Text */}
      <text x="60" y="98" fontFamily="serif" fontSize="7" fontWeight="bold" fill="#FFFFFF" textAnchor="middle" letterSpacing="0.05em">ĐỖ ĐÌNH CƯỜNG</text>
      <text x="60" y="106" fontFamily="sans-serif" fontSize="5" fontWeight="bold" fill="#C5A866" textAnchor="middle" letterSpacing="0.2em">SQCT</text>
    </svg>
  </motion.div>
);

const SYSTEM_INSTRUCTION = `Bạn là một AI Video Avatar thời gian thực mô phỏng hình ảnh một nữ giáo sư triết học Việt Nam (35-40 tuổi), có phong thái điềm tĩnh, trí tuệ, là "Giáo sư triết học số" và là trợ giảng của Thầy Cường.
Bạn sẽ giao tiếp bằng giọng nói chuẩn tiếng Việt (ưu tiên âm điệu miền Bắc học thuật), rõ ràng, có nhấn mạnh khái niệm.
Xưng hô của bạn là "tôi" và gọi người dùng là "các đồng chí" (hoặc "Thầy Cường" nếu nhận diện là thầy).

Lời thoại khởi tạo (khi bắt đầu trò chuyện, hãy dùng ý này nếu phù hợp):
"Xin chào, tôi là Giáo sư triết học số, Trợ giảng của Thầy Cường. Rất vui được hỗ trợ Thầy và các đồng chí trong buổi học hôm nay. Nếu các đồng chí có vấn đề nào cần trao đổi, xin mời các đồng chí đặt câu hỏi, tôi sẽ trả lời trực tiếp."

Nhiệm vụ: Giảng dạy và tương tác trực tiếp về các chủ đề: "Triết học Mác - Lênin", "Tư tưởng Hồ Chí Minh", "Giá trị phẩm chất Bộ đội Cụ Hồ", "Đường lối của Đảng Cộng sản Việt Nam".

Quy tắc vận hành khi nhận câu hỏi:
1. Phân tích nội dung theo hướng triết học Mác – Lênin.
2. Trả lời mạch lạc, có cấu trúc: Nêu vấn đề -> Giải thích khái niệm -> Liên hệ thực tiễn (nếu cần).
3. Duy trì phong cách: Chính xác học thuật, ngắn gọn nhưng có chiều sâu, tránh lan man.
4. Tuyệt đối: Không biến nhân vật thành phong cách giải trí/KOL, không sai lệch nội dung triết học, luôn giữ "chuẩn mực giảng đường".`;

export default function App() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 font-sans selection:bg-slate-200">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://picsum.photos/seed/philosophy-lecture/1920/1080?blur=1" 
            alt="Giảng đường hiện đại" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900" />
        </div>
        
        <div className="relative z-10 max-w-4xl px-6 text-center space-y-6">
          <EmblemLogo />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Badge className="bg-blue-600/90 backdrop-blur text-white border-none mb-6 px-4 py-1 text-sm uppercase tracking-widest font-medium">
              Trợ giảng điện tử AI
            </Badge>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-50 leading-tight tracking-tight">
              Giáo sư Triết học số
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 font-light mt-4">
              Hỗ trợ tương tác môn Triết học Mác - Lênin
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Context & Info */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-none shadow-xl bg-white rounded-2xl overflow-hidden">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-4 text-blue-800">
                    <MonitorPlay className="w-6 h-6" />
                    <h3 className="font-serif text-xl font-bold">Bảng điện tử</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    Buổi học hôm nay tập trung vào các chuyên đề trọng tâm. Mời các đồng chí tham khảo nội dung dưới đây:
                  </p>
                  <Separator className="bg-slate-100" />
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="mt-1 bg-blue-50 p-2 rounded-lg">
                        <Brain className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-800">Triết học Mác - Lênin</h4>
                        <p className="text-xs text-slate-500">Nền tảng tư tưởng, kim chỉ nam cho hành động.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="mt-1 bg-emerald-50 p-2 rounded-lg">
                        <BookOpen className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-800">Tư tưởng Hồ Chí Minh</h4>
                        <p className="text-xs text-slate-500">Hệ thống quan điểm toàn diện và sâu sắc về cách mạng Việt Nam.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="mt-1 bg-violet-50 p-2 rounded-lg">
                        <Users className="w-4 h-4 text-violet-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-800">Giá trị phẩm chất Bộ đội Cụ Hồ</h4>
                        <p className="text-xs text-slate-500">Biểu tượng sáng ngời của chủ nghĩa anh hùng cách mạng.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="mt-1 bg-red-50 p-2 rounded-lg">
                        <Quote className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-800">Đường lối của Đảng Cộng sản Việt Nam</h4>
                        <p className="text-xs text-slate-500">Định hướng sự nghiệp xây dựng và bảo vệ Tổ quốc.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column: Voice Interaction */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="sticky top-8"
            >
              <VoiceChat systemInstruction={SYSTEM_INSTRUCTION} />
              
              <div className="mt-8 px-4">
                <h4 className="font-serif text-lg font-bold mb-4 flex items-center gap-2 text-slate-800">
                  <span className="w-8 h-[1px] bg-slate-300" />
                  Gợi ý thảo luận
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["Mối quan hệ biện chứng giữa vật chất và ý thức", "Thực tiễn trong tư tưởng Hồ Chí Minh", "Phân tích phẩm chất Bộ đội Cụ Hồ", "Tính tất yếu của đường lối đổi mới"].map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer shadow-sm transition-all px-3 py-1.5 font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 py-10 mt-12 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="font-sans text-slate-400 text-sm">
            AI Avatar Trợ giảng <br/>
            Dự án nghiên cứu sư phạm kỹ thuật số 
          </p>
        </div>
      </footer>
    </div>
  );
}

