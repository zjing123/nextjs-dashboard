import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  console.log('收到上传请求');
  const body = (await request.json()) as HandleUploadBody;
  console.log('请求体:', body);

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (
        _pathname,
        /* clientPayload */
      ) => {
        // 生成客户端上传 token
        // 在实际应用中，这里应该进行用户认证和授权
        // 否则会允许匿名上传

        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
          addRandomSuffix: true,
          // callbackUrl 在 Vercel 上会自动计算
          tokenPayload: JSON.stringify({
            // 可选：上传完成时发送到服务器的数据
            // 可以传递用户 ID 或其他标识信息
            uploadType: 'customer-avatar',
            timestamp: new Date().toISOString(),
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // 客户端上传完成时由 Vercel API 调用
        // 本地开发时需要使用 ngrok 等工具

        console.log('blob upload completed', blob, tokenPayload);

        try {
          // 上传完成后的逻辑
          // 例如：更新数据库中的用户头像 URL
          // const { userId } = JSON.parse(tokenPayload);
          // await db.update({ avatar: blob.url, userId });
          
          console.log('Avatar uploaded successfully:', blob.url);
        } catch (error) {
          console.error('Failed to update user avatar:', error);
          throw new Error('Could not update user avatar');
        }
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }, // webhook 会重试 5 次等待 200 响应
    );
  }
}
