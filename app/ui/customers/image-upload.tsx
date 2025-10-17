// app/components/ImageUploader.jsx
"use client"; // 如果使用App Router，需要标记为客户端组件

import { useState } from "react";
import Image from 'next/image';

export default function ImageUploader() {
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadResult, setUploadResult] = useState<{ success: boolean; url?: string; message?: string } | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(e.target.files?.[0] || null);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("请先选择一张图片");
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append("image", selectedFile); // 'image' 需要与后端字段匹配

        try {
            const response = await fetch("/api/upload", { // 调用上传接口
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                setUploadResult({ success: true, url: result.url });
                alert("图片上传成功！");
            } else {
                setUploadResult({ success: false, message: result.error });
                alert(`上传失败: ${result.error}`);
            }
        } catch (error) {
            console.error("上传出错:", error);
            alert("上传过程中出现错误，请重试。");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? "上传中..." : "上传图片"}
            </button>
            {uploadResult?.success && uploadResult.url && (
                <div>
                    <p>预览：</p>
                    {/* 直接使用返回的URL路径显示图片 */}
                    <Image
                        src={uploadResult.url}
                        className="rounded-full"
                        alt="上传的图片"
                        width={28}
                        height={28}
                    />
                </div>
            )}
        </div>
    );
}