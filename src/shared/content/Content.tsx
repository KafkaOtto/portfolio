import { FC, useEffect, useState } from "react";

import { Text, Stack, StyleProps, Link, UnorderedList } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";

import LandingMd from "content/landing/landing-en.md";
import AboutMd from "content/about/about-en.md";
import {useTranslation} from "react-i18next";

interface State {
    landing: string;
    about: string;
}

export enum MarkdownFile {
    Landing = "landing",
    About = "about",
}

const Mapper = {
    [MarkdownFile.Landing]: LandingMd,
    [MarkdownFile.About]: AboutMd,
};

export const useContent = (fileName: MarkdownFile) => {
    const [data, setData] = useState<State>({ landing: "", about: "" });
    const { t } = useTranslation(['markdown']);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(fileName === MarkdownFile.About ? t("about", { ns: 'markdown' }) : t("landing", { ns: 'markdown' }));
                const text = await response.text();
                setData(prevData => ({
                    ...prevData,
                    [fileName]: text
                }));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [fileName, t]);

    return data;
};

interface Props extends StyleProps {
    children?: string;
}

export const Content: FC<Props> = ({ children, ...rest }) => {
    return (
        <Stack spacing="4">
            <ReactMarkdown
                components={{
                    p: ({ node, ...props }) => <Text {...rest} {...props} />,
                    a: ({ node, ...props }) => (
                        <Link href={props.href} target="_blank" color="primary.200" {...props} />
                    ),
                    ul: ({ node, ...props }) => {
                        const { ordered, ...rest } = props;

                        return (
                            <UnorderedList
                                {...rest}
                                data-aos="fade"
                                listStylePosition="inside"
                                display="grid"
                                gridTemplateColumns="repeat(2, 1fr)"
                                listStyleType="'‣ '"
                                fontWeight="600"
                            />
                        );
                    },
                    li: ({ node, ...props }) => {
                        const { ordered, ...rest } = props;

                        return <li data-aos="flip-up" data-aos-delay={props.index * 100 + 400} {...rest} />;
                    },
                }}
            >
                {children as string}
            </ReactMarkdown>
        </Stack>
    );
};
