import cls from "@src/features/courses-card/courseCard.module.scss";
import { TextModule } from "@src/shared/scss";
import { TCourses } from "@src/entities/courses";
import { FC, Key, useEffect, useState } from "react";
import axios from "axios";

export interface ICourseCard {
    NameCategories: string;
    CardInfo: TCourses;
    key: Key;
}

export const CourseCard: FC<ICourseCard> = ({ CardInfo, key, NameCategories }) => {
  const [svgContent, setSvgContent] = useState<string>("");
  
  useEffect(() => {
    const getSVG = async () => {
        try {
            const res = await axios.get(CardInfo.ImgUrl, {
                headers: {
                    'Content-Type': 'image/svg+xml'
                }
            });

            if (res.status === 200) {
                setSvgContent(res.data);
            } else {
                console.error('Error fetching SVG: Non-200 status code', res.status);
            }
        } catch (err) {
            console.error('Error fetching SVG:', err);
        }
    };

    getSVG();
  }, [CardInfo]);

  return (
    <div className={cls.card_continer} key={key}>
        <div className={cls.card_wrapper}>
            <div className={cls.card_categories}>
                <p className={TextModule.p_12}>• {NameCategories}</p>
                <p className={TextModule.p_12}>• {CardInfo.CourseDurations}</p>
            </div>

            <h4 className={TextModule.h_24}>{CardInfo.CourseName}</h4>

            <div
                dangerouslySetInnerHTML={{ __html: svgContent }}
                style={{ display: "inline-block" }}
            />
            
            <div className={cls.card_price}>
                <p className={TextModule.p_18}>Цена курса:</p>
                <p className={TextModule.p_18_bold}>от {CardInfo.CoursePrice} ₽</p>
            </div>
        </div>
    </div>
  );
};