import { useRef, WheelEvent } from 'react';
import './index.css';

const Home = () => {
  //#region 滾動換頁效果
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: WheelEvent) => {
    if (!containerRef.current) return;

    const currentScroll = containerRef.current.scrollLeft;
    const sectionWidth = containerRef.current.offsetWidth;

    if (e.deltaY > 0) {
      // 滾動向右
      const nextSectionIndex = Math.ceil(currentScroll / sectionWidth);
      containerRef.current.scrollTo({
        left: (nextSectionIndex + 1) * sectionWidth,
        behavior: 'smooth',
      });
    } else {
      // 滾動向左
      const prevSectionIndex = Math.floor(currentScroll / sectionWidth);
      containerRef.current.scrollTo({
        left: (prevSectionIndex - 1) * sectionWidth,
        behavior: 'smooth',
      });
    }
  };
  //#endregion

  return (
    <div
      ref={containerRef}
      onWheel={handleScroll}
      className="h-screen w-full flex overflow-hidden scroll-smooth"
    >
      {/* 第一個區塊 */}
      <section
        className="min-w-full h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url('src/assets/pictures/woman-with-book.jpg')`,
        }}
        // Photo by <a href="https://unsplash.com/@jmuniz?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Joel Muniz</a> on <a href="https://unsplash.com/photos/girl-reading-book-XqXJJhK-c08?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <h1 className="absolute flex flex-col justify-center h-full">
          <div className="pr-[10rem] ff-main text-custom-yellow text-[3rem] md:text-[7rem] lg:text-[9rem]">
            theBOOKCASE
          </div>
          <div className="flex justify-end items-baseline mt-[-4rem]">
            <span className="text-[2.5rem] align-baseline pr-4 ff-second">
              of
            </span>
            <div className="ff-main text-custom-yellow text-[3rem] md:text-[7rem] lg:text-[9rem]">
              QUOTE
            </div>
          </div>
          <div className="text-end mt-[-2rem]">
            produce by{' '}
            <a href="https://github.com/Celine510" target="blank">
              Celine 10
            </a>
          </div>
        </h1>

        <div className="absolute bottom-10 left-10 text-xl">
          帶來啟發的書庫，記錄你的閱讀之旅。
        </div>

        <div className="absolute bottom-10 right-10 text-xl">Today’s quote</div>
      </section>

      {/* 第二個區塊 */}
      <section
        className="min-w-full relative h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage: `url('src/assets/pictures/cozy-evening-read-stockcake.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="relative flex items-center justify-center h-full">
          <h1 className="text-[150px] ff-main">Section 2</h1>
        </div>
      </section>

      {/* 第三個區塊 */}
      <section
        className="min-w-full relative h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage: `url('src/assets/pictures/cozy-evening-read-stockcake.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="relative flex items-center justify-center h-full">
          <h1 className="text-[150px] ff-main">Section 3</h1>
        </div>
      </section>
    </div>
  );
};

export default Home;
