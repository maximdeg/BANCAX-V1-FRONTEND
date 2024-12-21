import React, { useMemo } from "react";
import useMovements from "../../Hooks/useMovements";
import { useGlobalContext } from "../../Context/GlobalContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./CategoryListWindow.css";

const CategoryListWindow = () => {
    const { movements, isLoadingMovements } = useMovements();
    const { getSourcesAndCategoriesFromStorage } = useGlobalContext();

    const { activeSources, activeCategories } = getSourcesAndCategoriesFromStorage();
    const movementsBySource = [];
    const movementsByCategory = [];
    const yearStatisticsArray = [];
    const monthStatisticsArray = [];

    const makeYearArray = () => {
        const movementsByYear = [];

        movements.forEach((movement) => {
            const date = new Date(movement.date);
            const year = date.getFullYear();

            movementsByYear[year] = movementsByYear[year] || [];
            movementsByYear[year].push(movement);
        });

        yearStatisticsArray.push(
            ...Object.keys(movementsByYear).map((year) => ({
                year: year,
                total_movements: movementsByYear[year].length,
                income: movementsByYear[year].reduce((total, movement) => (total += movement.amount > 0 ? movement.amount : 0), 0),
                spent: movementsByYear[year].reduce((total, movement) => (total -= movement.amount < 0 ? movement.amount : 0), 0),
                total_amount: movementsByYear[year].reduce((total, movement) => total + movement.amount, 0),
            }))
        );
    };

    const makeMonthArray = () => {
        const movementsByMonth = [];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        movements.forEach((movement) => {
            const date = new Date(movement.date);
            const month = date.getMonth();
            const year = date.getFullYear();

            movementsByMonth[year] = movementsByMonth[year] || [];
            movementsByMonth[year][month] = movementsByMonth[year][month] || [];
            movementsByMonth[year][month].push(movement);
        });

        monthStatisticsArray.push(
            ...Object.keys(movementsByMonth).map((year) => ({
                year: year,
                months: movementsByMonth[year].map((month, index) => ({
                    month: months[index].split("").slice(0, 3).join(""),
                    total_movements: movementsByMonth[year][index].length,
                    income: movementsByMonth[year][index].reduce((total, movement) => (total += movement.amount > 0 ? movement.amount : 0), 0),
                    spent: movementsByMonth[year][index].reduce((total, movement) => (total -= movement.amount < 0 ? movement.amount : 0), 0),
                    total_amount: movementsByMonth[year][index].reduce((total, movement) => total + movement.amount, 0),
                })),
            }))
        );

        monthStatisticsArray.forEach((year) => {
            year.months.sort().reverse();
        });
    };

    const makeSourceArray = () => {
        activeSources.forEach((source) => {
            const sourceMovements = movements.filter((movement) => movement.source === source.name);
            movementsBySource.push({
                name: source.name,
                movements: sourceMovements,
                color: source.color,
                total_movements: sourceMovements.length,
                total_amount: sourceMovements.reduce((total, movement) => total + movement.amount, 0),
            });
        });
    };

    const makeCategoryArray = () => {
        activeCategories.forEach((category) => {
            const categoryMovements = movements.filter((movement) => movement.category === category.name);
            movementsByCategory.push({
                name: category.name,
                movements: categoryMovements,
                color: category.color,
                total_movements: categoryMovements.length,
                total_amount: categoryMovements.reduce((total, movement) => total + movement.amount, 0),
            });
        });
    };

    useMemo(() => {
        makeYearArray();
        makeMonthArray();
        makeSourceArray();
        makeCategoryArray();
    }, [movements]);

    return (
        <>
            {isLoadingMovements ? (
                <LoadingSpinner></LoadingSpinner>
            ) : (
                <>
                    <MovementsByMonth list={monthStatisticsArray}></MovementsByMonth>
                    <h2 style={{ marginLeft: "10px" }}> By Category</h2>
                    <CategoryList list={movementsByCategory}></CategoryList>
                    <h2 style={{ marginLeft: "10px" }}> By Source</h2>
                    <CategoryList list={movementsBySource}></CategoryList>
                    <MovementsByYear list={yearStatisticsArray}></MovementsByYear>
                </>
            )}
        </>
    );
};

export default CategoryListWindow;

const MovementsByMonth = ({ list }) => {
    const rows = [];
    list.forEach((year) => {
        year.months.forEach((month) => {
            rows.push({
                year: year.year,
                month: month.month,
                total_movements: month.total_movements,
                income: month.income,
                spent: month.spent,
                total_amount: month.total_amount,
            });
        });
    });

    return (
        <section className="wrapper">
            <main className="row title">
                <ul>
                    <li key="0">Year/Month</li>
                    <li key="1">Movements</li>
                    <li key="2">Income</li>
                    <li key="3">Spent</li>
                    <li key="4">Total</li>
                </ul>
            </main>

            {rows.map((item, i) => {
                return (
                    <section className="row-fadeIn-wrapper">
                        <article className="row fadeIn list-item">
                            <ul key={i}>
                                <li>
                                    <a href="#">
                                        {item.year} / {item.month}
                                    </a>
                                </li>
                                <li>{item.total_movements}</li>
                                <li>${item.income.toFixed(2)}</li>
                                <li>${item.spent.toFixed(2)}</li>
                                <li>${item.total_amount.toFixed(2)}</li>
                            </ul>
                        </article>
                    </section>
                );
            })}
        </section>
    );
};

const CategoryList = ({ list }) => {
    return (
        <section className="wrapper-small">
            <main className="row title">
                <ul>
                    <li>Name</li>
                    <li>Total</li>
                </ul>
            </main>

            {list.map((item) => {
                return (
                    <section className="row-fadeIn-wrapper">
                        <article className="row fadeIn list-item" style={{ borderLeft: `6px solid ${item.color}` }}>
                            <ul key={item._id}>
                                <li style={{ textShadow: `2px 4px 5px ${item.color}` }}>{item.name}</li>
                                <li>${item.total_amount.toFixed(2)}</li>
                            </ul>
                        </article>
                    </section>
                );
            })}
        </section>
    );
};

const MovementsByYear = ({ list }) => {
    return (
        <section className="wrapper">
            <main className="row title">
                <ul>
                    <li>Year</li>
                    <li>Movements</li>
                    <li>Income</li>
                    <li>Spent</li>
                    <li>Total</li>
                </ul>
            </main>

            {list.map((item) => {
                return (
                    <section className="row-fadeIn-wrapper">
                        <article className="row fadeIn list-item">
                            <ul key={item._id}>
                                <li>
                                    <a href="#">{item.year}</a>
                                </li>
                                <li>{item.total_movements}</li>
                                <li>${item.income.toFixed(2)}</li>
                                <li>${item.spent.toFixed(2)}</li>
                                <li>${item.total_amount.toFixed(2)}</li>
                            </ul>
                        </article>
                    </section>
                );
            })}
        </section>
    );
};
