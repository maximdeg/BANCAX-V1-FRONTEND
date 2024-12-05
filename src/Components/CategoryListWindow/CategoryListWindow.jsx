import React, { useMemo } from "react";
import useMovements from "../../Hooks/useMovements";
import { useGlobalContext } from "../../Context/GlobalContext";
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
                    month: months[index],
                    total_movements: movementsByMonth[year][index].length,
                    income: movementsByMonth[year][index].reduce((total, movement) => (total += movement.amount > 0 ? movement.amount : 0), 0),
                    spent: movementsByMonth[year][index].reduce((total, movement) => (total -= movement.amount < 0 ? movement.amount : 0), 0),
                    total_amount: movementsByMonth[year][index].reduce((total, movement) => total + movement.amount, 0),
                })),
            }))
        );
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
                <p>Loading...</p>
            ) : (
                <>
                    <MovementsByMonth list={monthStatisticsArray}></MovementsByMonth>
                    <CategoryList list={movementsByCategory}></CategoryList>
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
                    <li>Year/Month</li>
                    <li>Movements</li>
                    <li>Income</li>
                    <li>Spent</li>
                    <li>Total</li>
                </ul>
            </main>

            {rows.map((item) => {
                return (
                    <section className="row-fadeIn-wrapper">
                        <article className="row fadeIn nfl">
                            <ul>
                                <li>
                                    <a href="#">
                                        {item.year} / {item.month}
                                    </a>
                                </li>
                                <li>{item.total_movements}</li>
                                <li>{item.income}</li>
                                <li>{item.spent}</li>
                                <li>{item.total_amount}</li>
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
        <section className="wrapper">
            <main className="row title">
                <ul>
                    <li>Name</li>
                    <li>Total</li>
                </ul>
            </main>

            {list.map((item) => {
                return (
                    <section className="row-fadeIn-wrapper">
                        <article className="row fadeIn nfl">
                            <ul>
                                <li>{item.name}</li>
                                <li>{item.total_amount}</li>
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
                        <article className="row fadeIn nfl">
                            <ul>
                                <li>
                                    <a href="#">{item.year}</a>
                                </li>
                                <li>{item.total_movements}</li>
                                <li>{item.income}</li>
                                <li>{item.spent}</li>
                                <li>{item.total_amount}</li>
                            </ul>
                        </article>
                    </section>
                );
            })}
        </section>
    );
};
