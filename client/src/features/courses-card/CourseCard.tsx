import cls from "@src/features/courses-card/courseCard.module.scss";
import { TextModule } from "@src/shared/scss";
import { TCourses } from "@src/entities/courses";
import {Dispatch, FC, Key, SetStateAction, useEffect, useState} from "react";
import axios from "axios";

export interface ICourseCard {
    NameCategories: string;
    CardInfo: TCourses;
    key: Key;
    onClick: Dispatch<SetStateAction<TCourses>>
}

export const CourseCard: FC<ICourseCard> = ({ CardInfo, key, NameCategories, onClick }) => {
  const [svgContent, setSvgContent] = useState<string>("");
  
  useEffect(() => {
    const getSVG = async () => {
        try {
            const res = await axios.get(CardInfo.ImgUrl, {
                headers: {
                    'Content-Type': 'image/svg+xml'
                }
            });

            setSvgContent(res.data);
        } catch (err) {
            console.error('Error fetching SVG:', err);
        }
    };

    getSVG();
  }, [CardInfo]);

  return (
    <div className={cls.card_continer} key={key} onClick={() => onClick(CardInfo)}>
        <div className={cls.card_wrapper}>
            <div className={cls.card_categories}>
                <p className={TextModule.p_12}>• {NameCategories}</p>
                <p className={TextModule.p_12}>• {CardInfo.CourseDurations}</p>
            </div>

            <h4 className={TextModule.h_24}>{CardInfo.CourseName}</h4>
            
            <div className={cls.card_svg_container}>
                <div
                    dangerouslySetInnerHTML={{ __html: svgContent }}
                    style={{ display: "block", width: "100%", height: "auto", maxWidth: "400px" }}
                />
            </div>
            
            <div className={cls.card_price}>
                <p className={TextModule.p_18}>Цена курса:</p>
                <p className={TextModule.p_18_bold}>от {CardInfo.CoursePrice} ₽</p>
            </div>
        </div>
    </div>
  );
};