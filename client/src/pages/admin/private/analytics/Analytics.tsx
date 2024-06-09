import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import cls from "@src/pages/admin/private/analytics/analitic.module.scss"
import {ContainerModule, TextModule} from "@src/shared/scss";

export const Analytics = () => {
  const lineChatRef = useRef<HTMLDivElement>(null);
  const PieChart = useRef<HTMLDivElement>(null);
  const UsersPieChart = useRef<HTMLDivElement>(null);
  const BigLineChart = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const chart = echarts.init(lineChatRef.current!);

    const options: echarts.EChartsOption = {
      title: {
        text: 'Заявки по датам',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: ['2024-06-01', '2024-06-03', '2024-06-06', '2024-06-09', '2024-06-12'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Заявки',
          type: 'line',
          data: [102, 456, 123, 13, 306, 253, 131],
        },
      ],
    };

    chart.setOption(options);

    return () => {
      chart.dispose();
    };
  }, []);

  useEffect(() => {
    const chart = echarts.init(PieChart.current!);

    const options: echarts.EChartsOption = {
      title: {
        text: 'Заявки по статусам',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: 'Статус',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'Принято' },
            { value: 735, name: 'Отклонено' },
            { value: 580, name: 'В ожидании' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };

    chart.setOption(options);

    return () => {
      chart.dispose();
    };
  }, []);

  useEffect(() => {
    const chart = echarts.init(UsersPieChart.current!);

    const options: echarts.EChartsOption = {
      title: {
        text: 'Активность пользоватлей',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: 'Статус',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1200, name: 'Активные' },
            { value: 300, name: 'Неактивные' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };

    chart.setOption(options);

    return () => {
      chart.dispose();
    };
  }, []);

  useEffect(() => {
    const chart = echarts.init(BigLineChart.current!);

    const options: echarts.EChartsOption = {
      title: {
        text: 'Аналитика: Пользователи, Заявки,  Вопросы',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Пользователи', 'Заявки', 'Вопросы'],
        top: '10%',
      },
      xAxis: {
        type: 'category',
        data: ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06', '2023-01-07'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Пользователи',
          type: 'line',
          data: [22, 210, 41, 102, 91, 544, 702],
          smooth: true,
        },
        {
          name: 'Заявки',
          type: 'line',
          data: [68, 743, 450, 784, 250, 382, 104],
          smooth: true,
        },
        {
          name: 'Вопросы',
          type: 'line',
          data: [87, 764, 597, 277, 521, 120, 109],
          smooth: true,
        },
      ],
    };

    chart.setOption(options);

    return () => {
      chart.dispose();
    };
  }, []);

  return (
    <section className={ContainerModule.wrapper}>
      <div className={cls.header}>
        <h2 className={TextModule.h_32}>Аналитика</h2>
      </div>

      <div className={cls.all_charts}>
        <div className={cls.charts_slice}>
          <div className={cls.bg_charts}>
            <div ref={lineChatRef} style={{width: '350px', height: '300px'}}/>
          </div>

          <div className={cls.bg_charts}>
            <div ref={PieChart} style={{width: '350px', height: '300px'}}/>
          </div>

          <div className={cls.bg_charts}>
            <div ref={UsersPieChart} style={{width: '350px', height: '300px'}}/>
          </div>
        </div>

        <div className={cls.bg_charts}>
          <div ref={BigLineChart} style={{width: '100%', height: '320px'}}/>
        </div>
      </div>

    </section>
  );
};