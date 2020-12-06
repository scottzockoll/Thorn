from markov import Markov
import pytest


def test_iteration_count_gets_reset():
    rules = {
        'ba': 'ab',
        'ca': 'ac',
        'da': 'ad',
        'cb': 'bc',
        'db': 'bd',
        'dc': 'cd'
    }
    m = Markov(rules, max_iter=6)
    for i in range(2):
        assert m.evaluate('cbadb') == 'abbcd'


def test_replace():
    a = 'abcd'
    b = 'x'
    assert Markov.replace(a, b, 1, 2) == 'axd'

    a = 'abcd'
    b = 'xx'
    assert Markov.replace(a, b, 1, 2) == 'axxd'

    a = 'abcde'
    b = 'x'
    assert Markov.replace(a, b, 1, 3) == 'axe'


def test_sort():
    rules = {
        'ba': 'ab',
        'ca': 'ac',
        'da': 'ad',
        'cb': 'bc',
        'db': 'bd',
        'dc': 'cd'
    }
    m = Markov(rules)
    assert m.evaluate('cbadb') == 'abbcd'


def test_replace_identical_subs_with_single_letter():
    rules = {
        'aa': 'a',
        'bb': 'b',
        'cc': 'c',
    }

    m = Markov(rules)
    assert m.evaluate('abbcacccaabb') == 'abcacab'


def test_infinite():
    rules = {
        'a': 'aa',
        'b': 'bb',
        'c': 'cc'
    }

    m = Markov(rules)
    with pytest.raises(RuntimeError):
        assert m.evaluate('acbb') == 'aaccbbbb'


def test_duplicate():
    rules = {
        '#a': 'aa#',
        '#b': 'bb#',
        '#c': 'cc#',
        '#': '.',
        '': '#'
    }

    m = Markov(rules)
    assert m.evaluate('acbb') == 'aaccbbbb'


def test_halt():
    rules = {
        'a': '.a'
    }

    m = Markov(rules)
    assert m.evaluate('a') == 'a'


def test_recognize():
    rules = {
        'a0': '0',
        '0a': '0',
        'b0': '0',
        '0b': '0',
        'ba': '0',
        'ab': '',
        'a': '0',
        'b': '0',
        '0': '.0',
        '': '.1'
    }

    m = Markov(rules)
    assert m.evaluate('aaabbb') == '1'
    assert m.evaluate('aabbb') == '0'
    assert m.evaluate('abab') == '0'
    assert m.evaluate('aaa') == '0'


# a*bc*
def test_a_star_b_c_star():
    rules = {
        '#a': '#',
        '#b': '$',
        '$c': '$',
        '$': '.1',
        '': '#'
    }

    m = Markov(rules)
    assert m.evaluate('aaabcc') == '1'
    assert m.evaluate('b') == '1'
    assert m.evaluate('abbc') == '1bc'
    assert m.evaluate('bac') == '1ac'

    # this one should be infinite
    with pytest.raises(RuntimeError):
        assert m.evaluate('aac') == '###c'


def test_succ():
    rules = {
        '1': '.11'
    }

    m = Markov(rules)
    assert m.evaluate('1111') == '11111'


def test_plus():
    rules = {
        '*': '',
        '1': '.'
    }

    m = Markov(rules)
    assert m.evaluate('111*1111') == '111111'


def test_monus():
    rules = {
        '1*1': '*',
        '*1': '*',
        '*': '.1'
    }

    m = Markov(rules)
    assert m.evaluate('11111*111') == '111'
    assert m.evaluate('11*11111') == '1'
    assert m.evaluate('11*11') == '1'