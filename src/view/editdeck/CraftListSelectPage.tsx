import {NativeProps, withNativeProps} from "@/util/nativeProps";
import React, {FC, useState} from "react";
import {mergeProps} from "@/util/withDefaultProps";
import {Craft} from "@/typing/Card";
import {Box, Button, Container} from "@mui/material";
import CraftListSelect from "@/component/craftselect/CraftListSelect";

export type CraftListSelectPageProps = {} & NativeProps;

const defaultProps = {};

const CraftListSelectPage: FC<CraftListSelectPageProps> = (p) => {
    const props = mergeProps(defaultProps, p);
    const [selectedCraft, setSelectedCraft] = useState<Craft | null>(null);

    return withNativeProps(
        props,
        <Box>
            <CraftListSelect
                value={selectedCraft}
                onSelect={setSelectedCraft}
            />
            <Container maxWidth="md" sx={{mt: 6}}>
                <Button
                    disabled={selectedCraft == null}
                    fullWidth
                    variant="contained"
                >
                    下一步
                </Button>
            </Container>
        </Box>
    )
}

export default CraftListSelectPage;
