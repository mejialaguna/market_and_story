import { LiveContentFeed } from '@/components/live-content-feed';
import { getAllLiveContent } from '@/lib/dal/live-content';

export const metadata = {
  title: 'Live Content - market&story',
  description: 'Experience immersive stories and product showcases',
};

export default async function LivePage():Promise<JSX.Element> {
  const liveContent = await getAllLiveContent();

  return <LiveContentFeed liveContent={liveContent} />;
}
