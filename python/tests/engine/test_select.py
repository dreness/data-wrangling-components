#
# Copyright (c) Microsoft. All rights reserved.
# Licensed under the MIT license. See LICENSE file in the project.
#

from tests.engine.test_store import get_test_store
from data_wrangling_components.engine.verbs.select import select
from data_wrangling_components.types import Step, Verb


def test_select():
    step = Step(
        Verb.Select,
        "table7",
        "output",
        args={"columns": ["ID", "item"]},
    )

    store = get_test_store()

    result = select(step, store)

    assert len(result.columns) == 2
    assert len(result) == 5
