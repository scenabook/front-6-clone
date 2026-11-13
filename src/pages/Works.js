import Work from "../components/Work";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Works() {
    return (
        <div className="featured-works">
            <div className="container">
                <h1>Work</h1>

                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    spaceBetween={20}
                    slidesPerView={1}
                >
                    <SwiperSlide><Work title="Project 1" /></SwiperSlide>
                    <SwiperSlide><Work title="Project 2" /></SwiperSlide>
                    <SwiperSlide><Work title="Project 3" /></SwiperSlide>
                    <SwiperSlide><Work title="Project 4" /></SwiperSlide>
                    <SwiperSlide><Work title="Project 5" /></SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}

export default Works;